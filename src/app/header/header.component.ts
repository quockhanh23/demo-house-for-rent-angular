import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {Notification} from "../model/notification";
import {checkTokenValid} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUser?: any
  username?: any
  token?: any
  notifications?: Notification[]
  count: any
  role?: any
  isAdmin = false;

  constructor(private notificationService: NotificationService,
              private router: Router,) {
    this.idUser = localStorage.getItem("idUser")
    console.log("this.idUser: " + this.idUser)
    this.username = localStorage.getItem("username")
    this.token = localStorage.getItem("token")
    this.role = localStorage.getItem("roles")
  }

  ngOnInit(): void {
    if (this.idUser != null) {
      this.getAllNotificationByIdUser();
      this.checkAdmin();
    }
  }

  getAllNotificationByIdUser() {
    this.notificationService.getAllNotificationByIdUser(this.idUser, this.token).subscribe(rs => {
      this.notifications = rs
      this.count = this.notifications.length
    }, error => {
      checkTokenValid(error, this.router);
    })
  }

  updateNotification(idNotification: any) {
    this.notificationService.updateNotification(idNotification, this.token).subscribe(() => {
      this.getAllNotificationByIdUser();
    })
  }

  updateAllNotification() {
    this.notificationService.updateAllNotification(this.idUser, this.token).subscribe(() => {
      this.getAllNotificationByIdUser();
    })
  }

  checkAdmin() {
    if (this.role != null) {
      let index = this.role?.indexOf("ADMIN")
      console.log("index:" + index)
      if (index > 0) this.isAdmin = true;
    }
  }

  logout() {
    localStorage.clear()
  }
}
