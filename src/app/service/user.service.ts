import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {JwtResponse} from "../model/jwt-response";

const API_URL = "http://localhost:8080/api/users"

const TOKEN = localStorage.getItem("token")

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getDetailUser(idUser: any): Observable<User> {
    return this.http.get<User>(API_URL + `/getDetailUser?idUser=${idUser}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }

  login(user: Object): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(API_URL + `/login`, user)
  }

  register(user: Object): Observable<User> {
    return this.http.post<User>(API_URL + `/register`, user)
  }
}
