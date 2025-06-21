import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {HouseService} from "../../service/house.service";
import {CategoriesService} from "../../service/categories.service";
import {Category} from "../../model/category";
import {LocationDTO} from "../../model/location-dto";
import {AddressService} from "../../service/address.service";
import {House} from "../../model/house";
import {Router} from "@angular/router";
import {getSnackbar} from "../../app.component";

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {

  categories?: Category[]
  idUser: any
  responseDataProvince?: LocationDTO
  responseDataDistrict?: LocationDTO
  responseDataWards?: LocationDTO
  selectedProvince?: string
  selectedDistrict?: string
  house?: House
  messageError?: string
  message = "Thao tác thành công!"

  houseForm: FormGroup = this.formBuilder.group({
    title: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    price: new FormControl(''),
    numberOfBedrooms: new FormControl(''),
    numberOfBathrooms: new FormControl(''),
    acreage: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private addressService: AddressService,
              private houseService: HouseService,
              private categoriesService: CategoriesService,) {
    this.idUser = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProvince();
  }

  getAllProvince() {
    this.addressService.getAllProvince().subscribe(rs => {
      this.responseDataProvince = rs;
    })
  }

  getAllDistrictByIdProvince() {
    this.responseDataWards = undefined;
    this.responseDataDistrict = undefined;
    const id = (document.getElementById("1") as HTMLSelectElement).value;
    this.addressService.getAllDistrictByIdProvince(id).subscribe(rs => {
      this.responseDataDistrict = rs;
    })
  }

  getAllWardsByIdDistrict() {
    const id = (document.getElementById("2") as HTMLSelectElement).value;
    this.addressService.getAllWardsByIdDistrict(id).subscribe(rs => {
      this.responseDataWards = rs;
    })
  }

  getAllCategory() {
    this.categoriesService.getAll().subscribe(rs => {
      this.categories = rs;
    })
  }

  createHouse() {
    let category = (document.getElementById("category") as HTMLSelectElement).value;
    let value;
    // @ts-ignore
    if (document.getElementById('huey').checked) {
      value = (document.getElementById('huey') as HTMLSelectElement).value;
    }
    // @ts-ignore
    if (document.getElementById('dewey').checked) {
      value = (document.getElementById('dewey') as HTMLSelectElement).value;
    }
    let province = (document.getElementById('1') as HTMLSelectElement).value;
    let district = (document.getElementById('2') as HTMLSelectElement).value;
    let ward = (document.getElementById('3') as HTMLSelectElement).value;

    let house = {
      title: this.houseForm.value.title,
      name: this.houseForm.value.name,
      address: this.houseForm.value.address,
      price: this.houseForm.value.price,
      numberOfBedrooms: this.houseForm.value.numberOfBedrooms,
      numberOfBathrooms: this.houseForm.value.numberOfBathrooms,
      acreage: this.houseForm.value.acreage,
      description: this.houseForm.value.description,
      idUser: this.idUser,
      categoryId: category,
      withGarden: value,
      province: this.getProvinceNameById(province),
      district: this.getDistrictNameById(district),
      ward: this.getWardNameById(ward)
    }
    let token = localStorage.getItem("token")
    if (null == token) token = ""
    this.houseService.createHouse(house, token).subscribe(rs => {
      this.house = rs
      setTimeout(() => {
        this.router.navigate(["/detailHouse", this.house?.id]).then()
      }, 500);
      getSnackbar()
    }, error => {
      this.messageError = error.error.message
    })
  }

  getProvinceNameById(id: any): string {
    if (this.responseDataProvince?.data != null) {
      for (let i = 0; i < this.responseDataProvince?.data?.length; i++) {
        if (this.responseDataProvince?.data[i].id == id) {
          return this.responseDataProvince?.data[i].name
        }
      }
    }
    return ""
  }

  getDistrictNameById(id: any): string {
    if (this.responseDataDistrict?.data != null) {
      for (let i = 0; i < this.responseDataDistrict?.data?.length; i++) {
        if (this.responseDataDistrict?.data[i].id == id) {
          return this.responseDataDistrict?.data[i].name
        }
      }
    }
    return ""
  }

  getWardNameById(id: any): string {
    if (this.responseDataWards?.data != null) {
      for (let i = 0; i < this.responseDataWards?.data?.length; i++) {
        if (this.responseDataWards?.data[i].id == id) {
          return this.responseDataWards?.data[i].name
        }
      }
    }
    return ""
  }
}
