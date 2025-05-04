import {Component, OnInit} from '@angular/core';
import {TransactionalService} from "../../service/transactional.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transactional} from "../../model/transactional";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";

@Component({
  selector: 'app-transactional-detail',
  templateUrl: './transactional-detail.component.html',
  styleUrls: ['./transactional-detail.component.css']
})
export class TransactionalDetailComponent implements OnInit {

  idUserLogin?: any
  idTransactional?: any
  token?: any
  transactional?: Transactional
  house?: House

  constructor(private transactionalService: TransactionalService,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idTransactional = rs.get('id')
    })
    this.getDetailTransactional();
  }

  getDetailTransactional() {
    this.transactionalService.getDetailTransactional(this.idTransactional, this.token).subscribe(rs => {
      this.transactional = rs;
      this.getDetailHouse(this.transactional?.idHouse);
    })
  }

  updateTransactional() {
    this.transactionalService.updateTransactional(this.idTransactional, "CONFIRM", this.token).subscribe(rs => {
      this.transactional = rs;
      this.updateStatusHouse(this.transactional?.idHouse);
    })
  }

  updateStatusHouse(idHouse: any) {
    this.houseService.updateStatusHouse(idHouse, "INACTIVE", this.token).subscribe(() => {
    })
  }

  getDetailHouse(idHouse: any) {
    this.houseService.getDetailHouse(idHouse).subscribe(rs => {
      this.house = rs;
    })
  }

}
