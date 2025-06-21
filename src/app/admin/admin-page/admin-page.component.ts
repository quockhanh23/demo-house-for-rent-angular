import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {User} from "../../model/user";
import {Report} from "../../model/report";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {getSnackbar, messageSuccess} from "../../app.component";

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
  message = messageSuccess
  searchForm: FormGroup = this.formBuilder.group({
    searchText: new FormControl(''),
  });

  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder) {
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
      getSnackbar()
    })
  }

  getAllUser() {
    let value = this.searchForm.value.searchText
    this.adminService.getAllUser(this.idUserLogin, value).subscribe(rs => {
      this.users = rs;
    })
  }

  getAllRepost() {
    let value = this.searchForm.value.searchText
    this.adminService.getAllRepost(this.idUserLogin, this.token, value).subscribe(rs => {
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
