import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  APIUrl = 'http://143.244.129.40:8000';
  // APIUrl = 'http://143.244.129.40:8001/api';
  private httpOptions: any;

  session_data: any
  
  // private cookieService:CookieService
  constructor(private http: HttpClient, private storageService:StorageService) { 
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json','x-csrftoken' : this.cookieService.get('csrftoken'), 'Authorization' : this.cookieService.get('sessionid') }),
    //   withCredentials: true
    // };
    this.init()
  }

  async init() {
    this.session_data = await this.storageService.getData();
  }

  public loginUser(data: any){
    return this.http.post(this.APIUrl + '/mobile/login/', data);
  }

  public user_details(data: any){
 
    console.log(this.session_data,'skdsjd')
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : this.session_data[0] }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/user/details/', data, httpOptions);
  }

  public mark_attendance_in(data: any){
 
    console.log(this.session_data,'skdsjd')
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : this.session_data[0] }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/attendance/in/', data, httpOptions);
  }

  public mark_attendance_out(data: any, session_id: string){
 
    console.log(session_id,'skdsjd')
    let httpOptions = {
      headers: new HttpHeaders({'x-csrftoken' : session_id }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/attendance/in/', data, httpOptions);
  }
}

// https://stackoverflow.com/questions/44613463/ionic-2-returning-zone-symbol-statenull-zone-symbol-valuecyprus