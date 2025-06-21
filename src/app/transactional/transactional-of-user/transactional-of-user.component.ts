import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {UserService} from "../../service/user.service";
import {TransactionalService} from "../../service/transactional.service";
import {PageTransactionalHistoryUser} from "../../model/page-transactional-history-user";
import {TransactionalHistoryUser} from "../../model/transactional-history-user";

@Component({
  selector: 'app-transactional-of-user',
  templateUrl: './transactional-of-user.component.html',
  styleUrls: ['./transactional-of-user.component.css']
})
export class TransactionalOfUserComponent implements OnInit {

  idUser?: any
  token?: any
  transactionalHistoryUsers?: TransactionalHistoryUser[]
  page?: PageTransactionalHistoryUser
  size?: number = 0
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;

  constructor(private houseService: HouseService,
              private transactionalService: TransactionalService) {
    this.token = localStorage.getItem("token")
    this.idUser = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllTransactionalByUser(0, 10);
  }

  getAllTransactionalByUser(page: any, size: any) {
    this.transactionalService.getAllTransactionalByUser(this.idUser, page, size, this.token).subscribe(rs => {
      this.page = rs
      this.transactionalHistoryUsers = this.page?.content
    })
  }
}
