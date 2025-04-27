import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {HouseService} from "../../service/house.service";
import {CategoriesService} from "../../service/categories.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {

  categories?: Category[]
  idUser: any
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
              private houseService: HouseService,
              private categoriesService: CategoriesService,) {
    this.idUser = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllCategory();
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
      idUser: this.idUser,
      categoryId: category,
      withGarden: value
    }
    let token = localStorage.getItem("token")
    if (null == token) token = ""
    this.houseService.createHouse(house, token).subscribe(() => {

    }, error => {

    })
  }
}
