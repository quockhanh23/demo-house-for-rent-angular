import {Component, OnInit} from '@angular/core';
import {TransactionalService} from "../../service/transactional.service";
import {ActivatedRoute} from "@angular/router";
import {Transactional} from "../../model/transactional";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {NotificationService} from "../../service/notification.service";
import {ActionNotification, getSnackbar} from "../../app.component";

@Component({
  selector: 'app-transactional-detail',
  templateUrl: './transactional-detail.component.html',
  styleUrls: ['./transactional-detail.component.css']
})
export class TransactionalDetailComponent implements OnInit {

  idUserLogin?: any
  idTransactional?: any
  token?: any
  transactional?: Transactional
  house?: House
  user?: User
  messageError?: string
  message = "Bạn đã hủy thuê nhà thành công!"
  title = "Chi tiết đơn đăng ký thuê nhà"
  isCancel = true;

  constructor(private transactionalService: TransactionalService,
              private notificationService: NotificationService,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idTransactional = rs.get('id')
    })
    this.getDetailTransactional();
  }

  getDetailTransactional() {
    this.transactionalService.getDetailTransactional(this.idTransactional, this.token).subscribe(rs => {
      this.transactional = rs;
      if (this.transactional != null) {
        this.transactional.totalAmountActual = Number(this.transactional?.totalAmountActual).toLocaleString('en-US');
        this.transactional.totalAmountExpected = Number(this.transactional?.totalAmountExpected).toLocaleString('en-US');
      }
      this.getDetailHouse(this.transactional?.idHouse);
      this.getDetailUser(this.transactional?.idUserHost);
      this.checkCancelRental();
    })
  }

  updateTransactional() {
    this.transactionalService.updateTransactional(this.idTransactional, "CONFIRM", this.token).subscribe(rs => {
      this.transactional = rs;
      this.updateStatusHouse(this.transactional?.idHouse);
    })
  }

  updateStatusHouse(idHouse: any) {
    this.houseService.updateStatusHouse(idHouse, "INACTIVE", this.token).subscribe(() => {
    })
  }

  getDetailHouse(idHouse: any) {
    this.houseService.getDetailHouse(idHouse).subscribe(rs => {
      this.house = rs;
      this.house.price = Number(this.house.price).toLocaleString('en-US');
    })
  }

  getDetailUser(idUser: any) {
    this.userService.getDetailUser(idUser, this.token).subscribe(rs => {
      this.user = rs
    })
  }

  cancelRental() {
    this.transactionalService.cancelRental(this.idTransactional, this.idUserLogin, this.token).subscribe(() => {
      this.notificationService
        .createNotification(this.house?.id, this.idUserLogin, ActionNotification.cancelRental, this.token)
        .subscribe()
      getSnackbar()
      this.getDetailTransactional();
    }, error => {
      this.messageError = error.error.message
    })
  }

  checkIn() {
    this.transactionalService.checkIn(this.idTransactional, this.idUserLogin, this.token).subscribe(rs => {
      this.transactional = rs
    })
  }

  checkOut() {
    this.transactionalService.updateTransactional(this.idTransactional, "COMPLETED", this.token)
      .subscribe(rs => {
        this.transactional = rs
      })
  }

  checkCancelRental() {
    if (this.transactional == null) return
    let status = ["COMPLETED", "CANCELED", "RENTED", "CONFIRM"]
    for (let i = 0; i < status.length; i++) {
      if (this.transactional.status == status[i]) {
        this.isCancel = false;
        return;
      }
    }
  }

}
