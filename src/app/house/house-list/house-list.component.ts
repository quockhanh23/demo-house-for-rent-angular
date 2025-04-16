import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {Page} from "../../model/page";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {

  page?: Page

  constructor(private houseService: HouseService) {
    console.log("token: " + localStorage.getItem("token"))
  }

  ngOnInit(): void {
    this.getAllHousePage();
  }

  getAllHousePage() {
    this.houseService.getAllHousePage(0, 10).subscribe(rs => {
      this.page = rs;
    }, error => {
      console.log("Lỗi getAllHousePage: " + JSON.stringify(error))
    })
  }

}
