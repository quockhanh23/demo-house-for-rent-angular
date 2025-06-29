import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../../service/categories.service";
import {Category} from "../../model/category";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {House} from "../../model/house";
import {getSnackbar, messageSuccess} from "../../app.component";

@Component({
  selector: 'app-house-update',
  templateUrl: './house-update.component.html',
  styleUrls: ['./house-update.component.css']
})
export class HouseUpdateComponent implements OnInit {

  categories?: Category[]
  token?: any
  idUser?: any
  house?: House
  messageError?: string
  message = messageSuccess
  title = "Cập nhật lại tin cho thuê nhà"
  houseForm: FormGroup = this.formBuilder.group({
    title: new FormControl(""),
    address: new FormControl(""),
    price: new FormControl(""),
    numberOfBedrooms: new FormControl(""),
    numberOfBathrooms: new FormControl(""),
    acreage: new FormControl(""),
    description: new FormControl(""),
  })

  constructor(private houseService: HouseService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private categoriesService: CategoriesService,) {
    this.token = localStorage.getItem("token")
    this.idUser = localStorage.getItem("idUser")
    this.getDetailHouse();
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoriesService.getAll().subscribe(rs => {
      this.categories = rs;
    })
  }

  getDetailHouse() {
    this.activatedRoute.paramMap.subscribe(rs => {
      const idHouse = rs.get('id')
      this.houseService.getDetailHouse(idHouse).subscribe(rs => {
        this.house = rs;
        this.houseForm = this.formBuilder.group({
          title: new FormControl(this.house?.title),
          address: new FormControl(this.house?.address),
          price: new FormControl(this.house?.price),
          numberOfBedrooms: new FormControl(this.house?.numberOfBedrooms),
          numberOfBathrooms: new FormControl(this.house?.numberOfBathrooms),
          acreage: new FormControl(this.house?.acreage),
          description: new FormControl(this.house?.description),
        });
      })
    })
  }

  updateHouse() {
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
    if (this.house && this.houseForm?.value) {
      this.house.title = this.houseForm.value.title;
      this.house.address = this.houseForm.value.address;
      this.house.price = this.houseForm.value.price;
      this.house.numberOfBedrooms = this.houseForm.value.numberOfBedrooms;
      this.house.numberOfBathrooms = this.houseForm.value.numberOfBathrooms;
      this.house.acreage = this.houseForm.value.acreage
      this.house.description = this.houseForm.value.description
      this.house.categoryId = category
      this.house.withGarden = value
    }
    let token = localStorage.getItem("token")
    if (null == token) token = ""
    // @ts-ignore
    this.houseService.updateHouse(this.house, this.house?.id, token).subscribe(() => {
      getSnackbar()
    }, error => {
      this.messageError = error.error.message
    })
  }
}
