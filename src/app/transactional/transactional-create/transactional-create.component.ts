import {Component, OnInit} from '@angular/core';
import {TransactionalService} from "../../service/transactional.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transactional} from "../../model/transactional";
import {NotificationService} from "../../service/notification.service";
import {ActionNotification, getSnackbar, messageSuccess} from "../../app.component";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";

@Component({
  selector: 'app-transactional-create',
  templateUrl: './transactional-create.component.html',
  styleUrls: ['./transactional-create.component.css']
})
export class TransactionalCreateComponent implements OnInit {

  idUserLogin?: any
  idHouse?: any
  token?: any
  transactional?: Transactional
  houseDetail?: House
  houses?: House[]
  messageError?: any
  message = messageSuccess
  title = "Đăng ký thuê nhà"
  loading = false;

  constructor(private transactionalService: TransactionalService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private houseService: HouseService,
              private router: Router) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idHouse = rs.get('id')
      this.houseService.getDetailHouse(this.idHouse).subscribe(rs => {
        this.houseDetail = rs;
        if (this.houseDetail != null && this.houseDetail?.district != null) {
          this.getAllHouseByDistrict(this.houseDetail?.district)
        }
      })
    })
  }

  createTransactional() {
    this.loading = true;
    this.messageError = null;
    let startDate = (document.getElementById("startDate") as HTMLSelectElement).value
    let endDate = (document.getElementById("endDate") as HTMLSelectElement).value

    let transactional = {
      idHouse: this.idHouse,
      idUserGuest: this.idUserLogin,
      startTime: startDate,
      endTime: endDate,
    }
    this.transactionalService.createTransactional(transactional, this.token).subscribe(rs => {
      this.transactional = rs
      this.notificationService
        .createNotification(this.idHouse, this.idUserLogin, ActionNotification.createTransactional, this.token)
        .subscribe()
      setTimeout(() => {
        this.router.navigate(['/detailTransactional', this.transactional?.id]).then()
      }, 800);
      getSnackbar()
      this.loading = false;
    }, error => {
      this.messageError = error.error.message
      this.loading = false;
    })
  }

  getAllHouseByDistrict(district: string) {
    this.houseService.getAllHouseByDistrict(district).subscribe(rs => {
      this.houses = rs
      const shuffled = [...this.houses].sort(() => 0.5 - Math.random());
      this.houses = shuffled.slice(0, 2);
    })
  }
}
