import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUser?: any
  username?: any

  constructor() {
    this.idUser = localStorage.getItem("idUser")
    console.log("this.idUser: " + this.idUser)
    this.username = localStorage.getItem("username")
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear()
  }
}
