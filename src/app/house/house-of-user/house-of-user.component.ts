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
}
