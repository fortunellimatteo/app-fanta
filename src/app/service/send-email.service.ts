import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private url = 'http://localhost:8080/provaEmail/sendEmail.php';
  constructor(private http:HttpClient) {
  }

  callPHPFileForEmail():Observable<any>{
      return this.http.post(this.url,{});
  }
}
