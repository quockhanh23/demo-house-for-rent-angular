import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {ActivatedRoute} from "@angular/router";
import {House} from "../../model/house";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {CountAddress} from "../../model/count-address";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

  houseDetail?: House
  houses?: House[]
  housesSameAddress?: CountAddress[]
  user?: User
  token?: any

  constructor(private houseService: HouseService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,) {
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.getDetailHouse()
  }

  getDetailHouse() {
    this.activatedRoute.paramMap.subscribe(rs => {
      const idHouse = rs.get('id')
      this.houseService.getDetailHouse(idHouse).subscribe(rs => {
        this.houseDetail = rs
        rs.district
        if (this.houseDetail != null && this.houseDetail?.address != null) {
          this.getAllHouseByAddress(this.houseDetail?.address);
        }
        if (this.houseDetail?.district != null) {
          this.getAllHouseBySameAddress(this.houseDetail?.district)
        }
        this.userService.getDetailUser(this.houseDetail?.idUser, this.token).subscribe(rs => {
          this.user = rs
        })
      })
    })
  }

  getAllHouseByAddress(address: string) {
    this.houseService.getAllHouseByAddress(address).subscribe(rs => {
      this.houses = rs
    })
  }

  getAllHouseBySameAddress(address: string) {
    this.houseService.getAllWardByDistrictAndCount(address).subscribe(rs => {
      this.housesSameAddress = rs
    })
  }
}
