import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {Notification} from "../model/notification";

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

  constructor(private notificationService: NotificationService) {
    this.idUser = localStorage.getItem("idUser")
    console.log("this.idUser: " + this.idUser)
    this.username = localStorage.getItem("username")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    if (this.idUser != null) {
      this.getAllNotificationByIdUser();
    }
  }

  getAllNotificationByIdUser() {
    this.notificationService.getAllNotificationByIdUser(this.idUser, this.token).subscribe(rs => {
      this.notifications = rs
      this.count = this.notifications.length
    })
  }

  logout() {
    localStorage.clear()
  }
}
