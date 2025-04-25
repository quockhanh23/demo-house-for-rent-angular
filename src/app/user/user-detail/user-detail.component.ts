import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {User} from "../../model/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user?: User
  idUser?: any
  token?: any
  openChangePassword = false
  openInformation = true
  openUpdateUser = false

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
              private formBuilder: FormBuilder) {
    this.idUser = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getDetailUser();
  }

  getDetailUser() {
    this.token = localStorage.getItem("token")
    console.log("token: " +  this.token)
    if (this.idUser == null || this.idUser == '') return
    this.userService.getDetailUser(this.idUser, this.token).subscribe(rs => {
      this.user = rs
    }, error => {
    })
  }

  changePassword() {
    let request = {
      username: this.changePasswordForm.value.username,
      newPassword: this.changePasswordForm.value.password,
      confirmNewPassword: this.changePasswordForm.value.password
    }
  }

  updateUser() {
    let request = {
      email: this.userUpdateForm.value.username,
      phone: this.userUpdateForm.value.password,
      fullName: this.userUpdateForm.value.password,
    }
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
