import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {JwtResponse} from "../../model/jwt-response";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtResponse?: JwtResponse

  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    let loginRequest = {
      username: this.userForm.value.username,
      password: this.userForm.value.password
    }
    this.userService.login(loginRequest).subscribe(rs => {
      this.jwtResponse = rs;
      localStorage.setItem("token", <string>this.jwtResponse.token)
      localStorage.setItem("idUser", <string>this.jwtResponse.id)
      localStorage.setItem("roles", JSON.stringify(this.jwtResponse.roles))
      setTimeout(() => {
        this.router.navigate(['/']).then()
      }, 1000);
    }, error => {
    })
  }
}
