import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user?: User
  messageError?: string
  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    fullName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    let user = {
      username: this.userForm.value.username,
      fullName: this.userForm.value.fullName,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword,
      phone: this.userForm.value.phone,
      email: this.userForm.value.email,
    }
    this.userService.register(user).subscribe(rs => {
      this.router.navigate(['/login']).then()
      this.user = rs;
    }, error => {
      this.messageError = error.error.message
    })
  }
}
