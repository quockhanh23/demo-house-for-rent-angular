import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transactional} from "../model/transactional";
import {PageTransactional} from "../model/page-transactional";
import {PageTransactionalHistoryUser} from "../model/page-transactional-history-user";

const API_URL = "http://localhost:8080/api/transactions"

@Injectable({
  providedIn: 'root'
})
export class TransactionalService {

  constructor(private http: HttpClient) {
  }

  createTransactional(transactional: Transactional, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/createTransactional`, transactional, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  updateTransactional(transactionalId: any, status: any, token: string): Observable<any> {
    return this.http.put<any>(API_URL +
      `/updateTransactional?transactionalId=${transactionalId}&status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  getDetailTransactional(transactionalId: any, token: string): Observable<any> {
    return this.http.get<any>(API_URL + `/getDetailTransactional?transactionalId=${transactionalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  getAllTransactionalPageByHouseId(houseId: any, page: any, size: any, token: string): Observable<PageTransactional> {
    return this.http.get<PageTransactional>(API_URL +
      `/getAllTransactionalPageByHouseId?houseId=${houseId}&page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  getAllTransactionalByUser(idUser: any, page: any, size: any, token: string): Observable<PageTransactionalHistoryUser> {
    return this.http.get<PageTransactionalHistoryUser>(API_URL +
      `/getAllTransactionalByUser?idUser=${idUser}&page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  totalMonthly(userId: any, month: any, token: string): Observable<any> {
    return this.http.get<any>(API_URL +
      `/totalMonthly?userId=${userId}&month=${month}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  cancelRental(transactionalId: any, userId: any, token: string): Observable<any> {
    return this.http.post<any>(API_URL +
      `/cancelRental?transactionalId=${transactionalId}&userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  checkIn(transactionalId: any, userId: any, token: string): Observable<any> {
    return this.http.post<any>(API_URL +
      `/checkIn?transactionalId=${transactionalId}&userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

}
