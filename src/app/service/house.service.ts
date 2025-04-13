import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page";
import {House} from "../model/house";
import {CountAddress} from "../model/count-address";

const API_URL = "http://localhost:8080/api/houses"

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuaDMiLCJpYXQiOjE3NDQ1MzcyMjQsImV4cCI6MTc0NDUzODY2NH0.f3L-QxXyzSsGDTWoo8LxJQeeEC1jHkMUqOnq2DCSCOA"

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) {
  }

  getAllHousePage(page: any, size: any): Observable<Page> {
    return this.http.get<Page>(API_URL + `/getAllPage?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  getAllHouseBySameAddress(address: string): Observable<CountAddress[]> {
    return this.http.get<CountAddress[]>(API_URL + `/getAllHouseBySameAddress?address=${address}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  getDetailHouse(idHouse: any): Observable<House> {
    return this.http.get<House>(API_URL + `/getDetailHouse?idHouse=${idHouse}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  getAllHouseByAddress(address: any): Observable<House[]> {
    return this.http.get<House[]>(API_URL + `/getAllHouseByAddress?address=${address}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  createHouse(house: House): Observable<any> {
    return this.http.post<any>(API_URL + `/createHouse`, house, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  updateHouse(house: House, idHouse: any): Observable<any> {
    return this.http.put<any>(API_URL + `/updateHouse?idHouse=${idHouse}`, house, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  updateStatus(idHouse: any, status: string): Observable<any> {
    return this.http.put<any>(API_URL + `/updateHouse?idHouse=${idHouse}&status=${status}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }
}
