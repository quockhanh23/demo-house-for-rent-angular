import {Component, OnInit} from '@angular/core';
import {TransactionalService} from "../../service/transactional.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transactional} from "../../model/transactional";

@Component({
  selector: 'app-transactional-create',
  templateUrl: './transactional-create.component.html',
  styleUrls: ['./transactional-create.component.css']
})
export class TransactionalCreateComponent implements OnInit {

  idUserLogin?: any
  idHouse?: any
  token?: any
  transactional?: Transactional

  constructor(private transactionalService: TransactionalService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.token = localStorage.getItem("token")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idHouse = rs.get('id')
    })
  }

  getDate() {
    let startDate = (document.getElementById("startDate") as HTMLSelectElement).value
    let endDate = (document.getElementById("endDate") as HTMLSelectElement).value

    let transactional = {
      idHouse: this.idHouse,
      idUserGuest: this.idUserLogin,
      startTime: startDate,
      endTime: endDate,
    }
    this.transactionalService.createTransactional(transactional, this.token).subscribe(rs => {
      this.transactional = rs
      this.router.navigate(['/detailTransactional', this.transactional?.id]).then()
    }, error => {

    })
  }
}
