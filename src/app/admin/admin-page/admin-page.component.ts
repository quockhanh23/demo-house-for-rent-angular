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

  title = "Quản lý"
  token?: any
  idUserLogin?: any
  users?: User[]
  selectedUserId: any
  reports?: Report[]
  isUserList = false
  isReportList = false
  checkLength = false;
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

  handlerSpace(arr: Object []) {
    this.checkLength = arr.length > 0 && arr.length < 3;
  }

  actionUser(action: any, idUser: any) {
    this.adminService.actionUser(this.idUserLogin, action, idUser).subscribe(() => {
      this.ngOnInit()
      getSnackbar()
    })
  }

  getAllUser() {
    this.checkLength = false;
    let value = this.searchForm.value.searchText
    this.adminService.getAllUser(this.idUserLogin, value).subscribe(rs => {
      this.users = rs;
      this.handlerSpace(this.users)
    })
  }

  getAllRepost() {
    this.checkLength = false;
    let value = this.searchForm.value.searchText
    this.adminService.getAllRepost(this.idUserLogin, this.token, value).subscribe(rs => {
      this.reports = rs
      if (this.reports != null) {
        this.handlerSpace(this.reports)
      }
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
