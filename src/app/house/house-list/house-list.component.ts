import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {Page} from "../../model/page";
import {CountAddress} from "../../model/count-address";
import {House} from "../../model/house";
import {messageSuccess} from "../../app.component";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {

  message = messageSuccess
  page?: Page
  countAddress?: CountAddress[]
  houses?: House[]
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;
  size?: number = 0;
  title = "Danh sách nhà cho thuê"

  constructor(private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.getAllHousePage(0, 10);
    this.getAllDistrictAndCount();
    this.getTopMostExpensive();
  }

  getAllHousePage(page: any, size: any) {
    let search = (document.getElementById("search") as HTMLSelectElement).value;
    this.houseService.getAllHousePage(page, size, search).subscribe(rs => {
      this.page = rs;
      this.size = this.page.content?.length
    }, error => {
      console.log("Lỗi getAllHousePage: " + JSON.stringify(error))
    })
  }

  searchByDistrict(page: any, size: any, district: any) {
    this.houseService.getAllHousePageByDistrict(page, size, district).subscribe(rs => {
      this.page = rs;
    }, error => {
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

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllHousePage(this.currentPage, 10);
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
    if (this.houses == null || this.houses.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.page?.page?.number < this.page?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllHousePage(this.currentPage, 10);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
