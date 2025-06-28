import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {UserService} from "../../service/user.service";
import {House} from "../../model/house";
import {Page} from "../../model/page";

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

  constructor(private houseService: HouseService,
              private userService: UserService,) {
    this.token = localStorage.getItem("token")
    this.idUser = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllHouseOfUser(0, 10);
  }

  getAllHouseOfUser(page: any, size: any) {
    this.houseService.getAllHouseOfUser(page, size, this.idUser).subscribe(rs => {
      this.page = rs;
      this.houses = this.page?.content
      this.size = this.houses?.length
    }, error => {
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
