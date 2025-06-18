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
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;

  currentPageComment?: number = 0;
  currentPageAddOneComment?: number = 1;
  previousPageNumberComment?: number = 1;
  currentNumberComment?: number = 2;
  nextPageNumberComment?: number = 3;

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
        if (this.houseDetail != null && this.houseDetail?.district != null) {
          this.getAllHouseByDistrict(this.houseDetail?.district);
        }
        if (this.houseDetail?.district != null) {
          this.getAllHouseBySameAddress(this.houseDetail?.district)
        }
        this.userService.getDetailUser(this.houseDetail?.idUser, this.token).subscribe(rs => {
          this.user = rs
          this.urlZalo = 'https://zalo.me/' + this.user?.phone
          this.urlPhone = 'tel:' + this.user?.phone
        })
        this.getAllTransactionalPageByHouseId(0, 10)
        this.getAllCommentByHouseId(0, 10)
      })
    })
  }

  getAllHouseByDistrict(address: string) {
    this.houseService.getAllHouseByDistrict(address).subscribe(rs => {
      this.houses = rs
    })
  }

  getAllHouseBySameAddress(address: string) {
    this.houseService.getAllWardByDistrictAndCount(address).subscribe(rs => {
      this.housesSameAddress = rs
    })
  }

  getAllTransactionalPageByHouseId(page: any, size: any) {
    this.transactionalService.getAllTransactionalPageByHouseId(this.idHouse, page, size, this.token)
      .subscribe(rs => {
        this.pageTransactional = rs
        this.transactional = this.pageTransactional?.content
      })
  }

  getAllCommentByHouseId(page: any, size: any) {
    this.commentService.getAllCommentByHouseId(this.idHouse, page, size, this.token).subscribe(rs => {
      this.pageComment = rs
      this.comments = this.pageComment?.content
    })
  }

  createComment() {
    let content = (document.getElementById("content") as HTMLSelectElement).value
    if (content == null || content == '') return
    let comment = {
      idUser: this.idUser,
      idHouse: this.idHouse,
      content: content
    }
    this.commentService.createComment(comment, this.token).subscribe(() => {
      this.getAllCommentByHouseId(0, 10);
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

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllTransactionalPageByHouseId(this.currentPage, 10);
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
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.pageTransactional?.page?.number < this.pageTransactional?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllTransactionalPageByHouseId(this.currentPage, 10);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }


  previousPageComment() {
    if (this.currentPageComment != null && this.currentPageComment > 0) {
      this.currentPageComment--;
      this.currentPageAddOneComment = this.currentPageComment + 1
      this.getAllCommentByHouseId(this.currentPageComment, 10);
      if (this.currentPageComment == 0 || this.currentPageComment == 1) {
        this.currentNumberComment = 2
        this.previousPageNumberComment = 1
        this.nextPageNumberComment = 3
      } else {
        this.currentNumberComment = this.currentPageComment + 1
        this.previousPageNumberComment = this.currentPageComment
        this.nextPageNumberComment = this.currentPageComment + 2
      }
    }
  }

  nextPageComment() {
    if (this.currentPageComment != null && (this.currentPageComment + 1)
      // @ts-ignore
      * this.pageComment?.page?.number < this.pageComment?.page?.totalElements) {
      this.currentPageComment++;
      this.currentPageAddOneComment = this.currentPageComment + 1
      this.getAllCommentByHouseId(this.currentPageComment, 10);
      this.currentNumberComment = this.currentPageComment + 1
      this.previousPageNumberComment = this.currentPageComment
      this.nextPageNumberComment = this.currentPageComment + 2
    }
  }
}
