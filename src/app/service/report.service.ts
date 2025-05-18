import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Report} from "../model/report";

const API_URL = "http://localhost:8080/api/reposts"

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getAllRepostByIdHouse(idHouse: any, token: any): Observable<any> {
    return this.http.get<any>(API_URL +
      `/getAllRepostByIdHouse?idHouse=${idHouse}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }


  createReport(report: Report, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/createReport`, report, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
