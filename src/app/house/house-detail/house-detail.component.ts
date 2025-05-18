import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {ActivatedRoute} from "@angular/router";
import {House} from "../../model/house";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {CountAddress} from "../../model/count-address";
import {TransactionalService} from "../../service/transactional.service";
import {Transactional} from "../../model/transactional";
import {PageTransactional} from "../../model/page-transactional";
import {CommentService} from "../../service/comment.service";
import {PageComment} from "../../model/page-comment";
import {Comment} from "../../model/comment";
import {NotificationService} from "../../service/notification.service";
import {ActionNotification} from "../../app.component";
import {ReportService} from "../../service/report.service";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

  houseDetail?: House
  houses?: House[]
  housesSameAddress?: CountAddress[]
  user?: User
  token?: any
  idUser?: any
  idHouse?: any
  transactional?: Transactional[]
  pageTransactional?: PageTransactional
  pageComment?: PageComment
  comments?: Comment[]
  countReport?: any
  urlZalo?: any
  urlPhone?: any

  constructor(private houseService: HouseService,
              private userService: UserService,
              private transactionalService: TransactionalService,
              private commentService: CommentService,
              private reportService: ReportService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,) {
    this.token = localStorage.getItem("token")
    this.idUser = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getDetailHouse()
    this.getAllRepostByIdHouse();
  }

  getDetailHouse() {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idHouse = rs.get('id')
      this.houseService.getDetailHouse(this.idHouse).subscribe(rs => {
        this.houseDetail = rs
        rs.district
        if (this.houseDetail != null && this.houseDetail?.address != null) {
          this.getAllHouseByAddress(this.houseDetail?.address);
        }
        if (this.houseDetail?.district != null) {
          this.getAllHouseBySameAddress(this.houseDetail?.district)
        }
        this.userService.getDetailUser(this.houseDetail?.idUser, this.token).subscribe(rs => {
          this.user = rs
          this.urlZalo = 'https://zalo.me/' + this.user?.phone
          this.urlPhone = 'tel:' + this.user?.phone
        })
        this.getAllTransactionalPageByHouseId()
        this.getAllCommentByHouseId()
      })
    })
  }

  getAllHouseByAddress(address: string) {
    this.houseService.getAllHouseByAddress(address).subscribe(rs => {
      this.houses = rs
    })
  }

  getAllHouseBySameAddress(address: string) {
    this.houseService.getAllWardByDistrictAndCount(address).subscribe(rs => {
      this.housesSameAddress = rs
    })
  }

  getAllTransactionalPageByHouseId() {
    this.transactionalService.getAllTransactionalPageByHouseId(this.idHouse, 0, 10, this.token)
      .subscribe(rs => {
        this.pageTransactional = rs
        this.transactional = this.pageTransactional?.content
      })
  }

  getAllCommentByHouseId() {
    this.commentService.getAllCommentByHouseId(this.idHouse, 0, 10, this.token).subscribe(rs => {
      this.pageComment = rs
      this.comments = this.pageComment?.content
    })
  }

  createComment() {
    let content = (document.getElementById("content") as HTMLSelectElement).value
    let comment = {
      idUser: this.idUser,
      idHouse: this.idHouse,
      content: content
    }
    this.commentService.createComment(comment, this.token).subscribe(() => {
      this.getAllCommentByHouseId();
      this.notificationService
        .createNotification(this.idHouse, this.idUser, ActionNotification.createComment, this.token)
        .subscribe(() => {
        })
    })
  }

  getAllRepostByIdHouse() {
    this.reportService.getAllRepostByIdHouse(this.idHouse, this.token).subscribe(rs => {
      this.countReport = rs
    })
  }
}
