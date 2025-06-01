import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../model/notification";

const API_URL = "http://localhost:8080/api/notifications"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getAllNotificationByIdUser(idUser: any, token: any): Observable<Notification[]> {
    return this.http.get<Notification[]>(API_URL +
      `/getAllNotificationByIdUser?idUser=${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  createNotification(idHouse: any, idUserAction: any, actionName: any, token: string): Observable<any> {
    return this.http.post<any>(API_URL +
      `/createNotification?idHouse=${idHouse}&idUserAction=${idUserAction}&actionName=${actionName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  updateNotification(idNotification: any, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/updateNotification?idNotification=${idNotification}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  updateAllNotification(idUser: any, token: string): Observable<any> {
    return this.http.post<any>(API_URL + `/updateAllNotification?idUser=${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
