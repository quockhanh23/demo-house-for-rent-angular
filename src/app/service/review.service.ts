import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../model/review";

const API_URL = "http://localhost:8080/api/reviews"

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  createReview(review: Review, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/createReview`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  getAllReviewByIdHouse(idHouse: any, token: any): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL +
      `/getAllReviewByIdHouse?idHouse=${idHouse}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
