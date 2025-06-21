import {Component, OnInit} from '@angular/core';
import {TransactionalService} from "../../service/transactional.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transactional} from "../../model/transactional";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {NotificationService} from "../../service/notification.service";
import {ActionNotification, getSnackbar, messageSuccess} from "../../app.component";

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
  message = "Bạn đã hủy thuê nhà thành công!"
  title = "Chi tiết đơn đăng ký thuê nhà"

  constructor(private transactionalService: TransactionalService,
              private notificationService: NotificationService,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
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
      this.getDetailHouse(this.transactional?.idHouse);
      this.getDetailUser(this.transactional?.idUserHost);
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
      this.ngOnInit()
    })
  }

  checkIn() {
    this.transactionalService.checkIn(this.idTransactional, this.idUserLogin, this.token).subscribe(() => {
    })
  }

}
