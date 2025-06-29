import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = "http://localhost:8080/api/images"

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {


  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${API_URL}/uploadImageToImgbb`, formData, {
      responseType: 'text' as 'json'
    });
  }
}
