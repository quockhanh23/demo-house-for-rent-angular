import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {Page} from "../../model/page";
import {CountAddress} from "../../model/count-address";
import {House} from "../../model/house";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {

  page?: Page
  countAddress?: CountAddress[]
  houses?:House[]

  constructor(private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.getAllHousePage();
    this.getAllDistrictAndCount();
    this.getTopMostExpensive();
  }

  getAllHousePage() {
    let search = (document.getElementById("search") as HTMLSelectElement).value;
    this.houseService.getAllHousePage(0, 10, search).subscribe(rs => {
      this.page = rs;
    }, error => {
      console.log("Lỗi getAllHousePage: " + JSON.stringify(error))
    })
  }

  getAllDistrictAndCount() {
    this.houseService.getAllDistrictAndCount().subscribe(rs => {
      this.countAddress = rs;
    }, error => {
      console.log("Lỗi getAllDistrictAndCount: " + JSON.stringify(error))
    })
  }

  getTopMostExpensive() {
    this.houseService.topMostExpensive().subscribe(rs => {
      this.houses = rs;
    }, error => {
      console.log("Lỗi getAllDistrictAndCount: " + JSON.stringify(error))
    })
  }
}
