import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../service/report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {

  idUserLogin?: any
  idHouse?: any
  token?: any
  messageError?: any

  constructor(private reportService: ReportService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idHouse = rs.get('id')
    })
  }

  createReport() {
    let content = (document.getElementById("content") as HTMLSelectElement).value
    let report = {
      idHouse: this.idHouse,
      idUserReport: this.idUserLogin,
      content: content,
    }
    this.reportService.createReport(report, this.token).subscribe(() => {
      this.router.navigate(['/detailHouse', this.idHouse]).then()
    }, errorObject => {
      this.messageError = errorObject.error.message
    })
  }
}
