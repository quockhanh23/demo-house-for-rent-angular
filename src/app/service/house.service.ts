import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page";
import {House} from "../model/house";
import {CountAddress} from "../model/count-address";

const API_URL = "http://localhost:8080/api/houses"

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) {
  }

  getAllHousePage(page: any, size: any, searchText: string): Observable<Page> {
    return this.http.get<Page>(API_URL + `/getAllPage?page=${page}&size=${size}&searchText=${searchText}`)
  }

  getAllHouseOfUser(page: any, size: any, idUser: string): Observable<Page> {
    return this.http.get<Page>(API_URL + `/getAllHouseOfUser?page=${page}&size=${size}&idUser=${idUser}`)
  }

  getAllHousePageByDistrict(page: any, size: any, searchText: string): Observable<Page> {
    return this.http.get<Page>(API_URL + `/getAllHousePageByDistrict?page=${page}&size=${size}&searchText=${searchText}`)
  }

  getAllWardByDistrictAndCount(address: string): Observable<CountAddress[]> {
    return this.http.get<CountAddress[]>(API_URL + `/getAllWardByDistrictAndCount?address=${address}`,)
  }

  getAllDistrictAndCount(): Observable<CountAddress[]> {
    return this.http.get<CountAddress[]>(API_URL + '/getAllDistrictAndCount',)
  }

  topMostExpensive(): Observable<House[]> {
    return this.http.get<House[]>(API_URL + '/topMostExpensive',)
  }

  getDetailHouse(idHouse: any): Observable<House> {
    return this.http.get<House>(API_URL + `/getDetailHouse?idHouse=${idHouse}`,)
  }

  getAllHouseByDistrict(district: any): Observable<House[]> {
    return this.http.get<House[]>(API_URL + `/getAllHouseByDistrict?district=${district}`, {})
  }

  createHouse(house: House, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/createHouse`, house, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  updateHouse(house: House, idHouse: any, token: string): Observable<any> {
    return this.http.put<any>(API_URL + `/updateHouse?idHouse=${idHouse}`, house, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  updateStatusHouse(idHouse: any, status: string, token: string): Observable<any> {
    return this.http.put<any>(API_URL + `/updateStatusHouse?idHouse=${idHouse}&status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
