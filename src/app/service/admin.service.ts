import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

const API_URL = "http://localhost:8080/api/admins"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllUser(idAdmin: any, searchText: any): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/getAllUser?idAdmin=${idAdmin}&searchText=${searchText}`,)
  }

  actionUser(idAdmin: any, action: string, idUser: any): Observable<any> {
    return this.http.put<any>(API_URL + `/actionUser?idAdmin=${idAdmin}&action=${action}&idUser=${idUser}`, {},)
  }

  getAllRepost(idAdmin: any, token: any, searchText: any): Observable<any> {
    return this.http.get<any>(API_URL +
      `/getAllRepost?idAdmin=${idAdmin}&searchText=${searchText}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

}
