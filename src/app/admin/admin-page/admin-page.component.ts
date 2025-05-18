import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {User} from "../../model/user";
import {Report} from "../../model/report";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  token?: any
  idUserLogin?: any
  users?: User[]
  selectedUserId: any
  reports?: Report[]
  isUserList = false
  isReportList = false

  constructor(private adminService: AdminService) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.isUserList = true;
    this.isReportList = false;
    this.getAllUser();
  }

  actionUser(action: any, idUser: any) {
    this.adminService.actionUser(this.idUserLogin, action, idUser).subscribe(() => {
      this.ngOnInit()
    })
  }

  getAllUser() {
    this.adminService.getAllUser(this.idUserLogin).subscribe(rs => {
      this.users = rs;
    })
  }

  getAllRepost() {
    this.adminService.getAllRepost(this.idUserLogin, this.token).subscribe(rs => {
      this.reports = rs
    })
  }

  changeToUser() {
    this.isUserList = true;
    this.isReportList = false;
    this.getAllUser();
  }

  changeToReport() {
    this.isUserList = false;
    this.isReportList = true;
    this.getAllRepost();
  }

}
