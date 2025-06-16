import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

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

  changePasswordForm: FormGroup = this.formBuilder.group({
    password: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
  });

  userUpdateForm: FormGroup = this.formBuilder.group({
    email: new FormControl(this.user?.email),
    phone: new FormControl(this.user?.phone),
    fullName: new FormControl(this.user?.fullName),
  });

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
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

  getDetailUser(idUser: any) {
    this.token = localStorage.getItem("token")
    console.log("token: " + this.token)
    this.userService.getDetailUser(idUser, this.token).subscribe(rs => {
      this.user = rs
    }, error => {
      this.messageError = error.error.message
    })
  }

  changePassword() {
    let request = {
      username: this.changePasswordForm.value.username,
      newPassword: this.changePasswordForm.value.password,
      confirmNewPassword: this.changePasswordForm.value.password
    }
    this.userService.changePassword(request, this.token).subscribe(() => {
    }, error => {
      this.messageErrorChangePassword = error.error.message
    })
  }

  updateUser() {
    let request = {
      email: this.userUpdateForm.value.username,
      phone: this.userUpdateForm.value.password,
      fullName: this.userUpdateForm.value.password,
    }
    this.userService.updateUser(request, this.token).subscribe(rs => {
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
