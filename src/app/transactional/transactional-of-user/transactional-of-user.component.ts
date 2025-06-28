import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {TransactionalService} from "../../service/transactional.service";
import {PageTransactionalHistoryUser} from "../../model/page-transactional-history-user";
import {TransactionalHistoryUser} from "../../model/transactional-history-user";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-transactional-of-user',
  templateUrl: './transactional-of-user.component.html',
  styleUrls: ['./transactional-of-user.component.css']
})
export class TransactionalOfUserComponent implements OnInit {

  title = "Lịch sử thuê nhà của bạn"
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
  checkLength = false;

  constructor(private houseService: HouseService,
              private transactionalService: TransactionalService) {
    this.token = localStorage.getItem("token")
    this.idUser = localStorage.getItem("idUser")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    this.getAllTransactionalByUser(0, 10);
  }

  handlerSpace(arr: Object []) {
    this.checkLength = arr.length > 0 && arr.length < 2;
  }

  getAllTransactionalByUser(page: any, size: any) {
    this.transactionalService.getAllTransactionalByUser(this.idUser, page, size, this.token).subscribe(rs => {
      this.page = rs
      this.transactionalHistoryUsers = this.page?.content
      if (this.transactionalHistoryUsers != null) {
        this.handlerSpace(this.transactionalHistoryUsers);
      }
    })
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllTransactionalByUser(this.currentPage, 10);
      if (this.currentPage == 0 || this.currentPage == 1) {
        this.currentNumber = 2
        this.previousPageNumber = 1
        this.nextPageNumber = 3
      } else {
        this.currentNumber = this.currentPage + 1
        this.previousPageNumber = this.currentPage
        this.nextPageNumber = this.currentPage + 2
      }
    }
  }

  nextPage() {
    if (this.transactionalHistoryUsers == null || this.transactionalHistoryUsers?.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.page?.page?.number < this.page?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllTransactionalByUser(this.currentPage, 10);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
