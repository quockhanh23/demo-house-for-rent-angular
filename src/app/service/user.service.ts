import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {JwtResponse} from "../model/jwt-response";

const API_URL = "http://localhost:8080/api/users"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getDetailUser(idUser: any, token: any): Observable<User> {
    console.log("token getDetailUser: " +  token)
    return this.http.get<User>(API_URL + `/getDetailUser?idUser=${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  login(user: Object): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(API_URL + `/login`, user)
  }

  register(user: Object): Observable<User> {
    return this.http.post<User>(API_URL + `/register`, user)
  }

  updateUser(user: Object, token: any): Observable<any> {
    return this.http.put<any>(API_URL + `/updateUser`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  changePassword(user: Object, token: any): Observable<any> {
    return this.http.put<any>(API_URL + `/changePassword`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
