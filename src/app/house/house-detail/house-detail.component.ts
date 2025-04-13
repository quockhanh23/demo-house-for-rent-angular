import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {ActivatedRoute} from "@angular/router";
import {House} from "../../model/house";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

  houseDetail?: House
  houses?: House[]

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getDetailHouse()
  }

  getDetailHouse() {
    this.activatedRoute.paramMap.subscribe(rs => {
      const idHouse = rs.get('id')
      this.houseService.getDetailHouse(idHouse).subscribe(rs => {
        this.houseDetail = rs
        if (this.houseDetail != null && this.houseDetail?.address != null) {
          this.getAllHouseByAddress(this.houseDetail?.address);
        }
      })
    })
  }

  getAllHouseByAddress(address: string) {
    this.houseService.getAllHouseByAddress(address).subscribe(rs => {
      this.houses = rs
    })
  }
}
