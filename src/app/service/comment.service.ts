import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageComment} from "../model/page-comment";
import {Comment} from "../model/comment";

const API_URL = "http://localhost:8080/api/comments"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllCommentByHouseId(houseId: any, page: any, size: any, token: any): Observable<PageComment> {
    return this.http.get<PageComment>(API_URL +
      `/getAllCommentByHouseId?houseId=${houseId}&page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  createComment(comment: Comment, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/createComment`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
