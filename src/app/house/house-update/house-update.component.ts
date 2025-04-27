import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../../service/categories.service";
import {Category} from "../../model/category";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {House} from "../../model/house";

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

  houseForm: FormGroup = this.formBuilder.group({
    title: new FormControl(""),
    name: new FormControl(''),
    address: new FormControl(''),
    price: new FormControl(''),
    numberOfBedrooms: new FormControl(''),
    numberOfBathrooms: new FormControl(''),
    acreage: new FormControl(''),
    description: new FormControl(''),
  });

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
      value = (document.getElementById('dewey')as HTMLSelectElement).value;
    }
    let house = {
      title: this.houseForm.value.title,
      name: this.houseForm.value.name,
      address: this.houseForm.value.address,
      price: this.houseForm.value.price,
      numberOfBedrooms: this.houseForm.value.numberOfBedrooms,
      numberOfBathrooms: this.houseForm.value.numberOfBathrooms,
      acreage: this.houseForm.value.acreage,
      description: this.houseForm.value.description,
      categoryId: category,
      withGarden: value
    }
    let token = localStorage.getItem("token")
    if (null == token) token = ""
    this.houseService.updateHouse(house, this.house?.id, token).subscribe(() => {

    }, error => {

    })
  }
}
