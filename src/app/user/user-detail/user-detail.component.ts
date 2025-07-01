import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {ActivatedRoute} from "@angular/router";
import {whitespaceValidator} from "../../app.component";
import {TransactionalService} from "../../service/transactional.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  title = "Thông tin cá nhân"
  user?: User
  idUserLogin?: any
  idUser?: any
  token?: any
  openChangePassword = false
  openInformation = true
  openUpdateUser = false
  messageErrorChangePassword?: string
  messageErrorUpdateUser?: string
  messageError?: string
  message = ""
  total = ""

  changePasswordForm: FormGroup = this.formBuilder.group({
    password: new FormControl('', [Validators.required, whitespaceValidator()]),
    newPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    confirmNewPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
  });

  userUpdateForm: FormGroup = this.formBuilder.group({
    email: new FormControl(this.user?.email),
    phone: new FormControl(this.user?.phone),
    fullName: new FormControl(this.user?.fullName),
  });

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private transactionalService: TransactionalService,
              private formBuilder: FormBuilder) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idUser = rs.get('id')
    })
    if (this.idUser == null) {
      this.getDetailUser(this.idUserLogin);
    } else {
      this.getDetailUser(this.idUser);
    }
  }

  totalMonthly() {
    this.messageError = undefined
    let month = (document.getElementById("month") as HTMLSelectElement).value;
    this.transactionalService.totalMonthly(this.idUser, month, this.token).subscribe(rs => {
      this.total = rs
    }, error => {
      this.messageError = error.error.message
    })
  }

  getDetailUser(idUser: any) {
    this.messageError = undefined
    this.token = localStorage.getItem("token")
    console.log("token: " + this.token)
    this.userService.getDetailUser(idUser, this.token).subscribe(rs => {
      this.user = rs
    }, error => {
      this.messageError = error.error.message
    })
  }

  changePassword() {
    this.messageErrorChangePassword = undefined
    let request = {
      username: this.changePasswordForm.value.username,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmNewPassword: this.changePasswordForm.value.confirmNewPassword
    }
    this.userService.changePassword(request, this.token).subscribe(() => {
      this.message = "Đổi mật khẩu thành công!"
    }, error => {
      this.messageErrorChangePassword = error.error.message
    })
  }

  updateUser() {
    this.messageErrorUpdateUser = undefined
    let request = {
      email: this.userUpdateForm.value.email,
      phone: this.userUpdateForm.value.phone,
      fullName: this.userUpdateForm.value.fullName,
      id: this.idUser
    }
    this.userService.updateUser(request, this.token).subscribe(rs => {
      this.message = "Thay đổi thông tin thành công!"
      this.user = rs
    }, error => {
      this.messageErrorUpdateUser = error.error.message
    })
  }

  toChangePassword() {
    this.openInformation = false;
    this.openChangePassword = true;
    this.openUpdateUser = false;
  }

  toInformation() {
    this.openInformation = true;
    this.openChangePassword = false;
    this.openUpdateUser = false;
  }

  toUpdateUser() {
    this.openUpdateUser = true;
    this.openInformation = false;
    this.openChangePassword = false;
  }
}
