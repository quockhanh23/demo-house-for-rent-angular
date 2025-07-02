import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";
import {Page} from "../../model/page";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-house-of-user',
  templateUrl: './house-of-user.component.html',
  styleUrls: ['./house-of-user.component.css']
})
export class HouseOfUserComponent implements OnInit {

  title = "Danh sách nhà đã đăng cho thuê của bạn"
  idUser?: any
  token?: any
  houses?: House[]
  page?: Page
  size?: number = 0
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;

  constructor(private houseService: HouseService) {
    this.token = localStorage.getItem("token")
    this.idUser = localStorage.getItem("idUser")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    this.getAllHouseOfUser(0, 10);
  }

  getAllHouseOfUser(page: any, size: any) {
    this.houseService.getAllHouseOfUser(page, size, this.idUser).subscribe(rs => {
      this.page = rs;
      this.houses = this.page?.content
      if (this.houses != null) {
        for (let i = 0; i < this.houses?.length; i++) {
          this.houses[i].price = Number(this.houses[i].price).toLocaleString('en-US');
        }
      }
      this.size = this.houses?.length
    }, error => {
      console.log("error: " + error.error.message)
    })
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllHouseOfUser(this.currentPage, 10);
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
    if (this.houses == null || this.houses?.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.page?.page?.number < this.page?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllHouseOfUser(this.currentPage, 10);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
