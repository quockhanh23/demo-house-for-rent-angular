import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

const API_URL = "http://localhost:8080/api/users"

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuaDMiLCJpYXQiOjE3NDQ1MzcyMjQsImV4cCI6MTc0NDUzODY2NH0.f3L-QxXyzSsGDTWoo8LxJQeeEC1jHkMUqOnq2DCSCOA"

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
}
