import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  APIUrl = 'http://localhost:8000';
  private httpOptions: any;

  sessionid: any;
  csrf: any;
  
  constructor(private http: HttpClient, private storageService:StorageService) {  }

  public loginUser(credentials: any): Observable<any> {
    return this.http.post(this.APIUrl + '/login/', credentials).pipe(
      map((data: any) => data),
      switchMap(session_data => {
        return this.storageService.addData({"sessionid": session_data['sessionid'], "csrf": session_data['csrf']}); 
      })
    );
  }

  public user_details(data: any, sessionid: string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/user/details/', data, httpOptions);
  }

  public add_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/add/todo/', data, httpOptions);
  }

  public mark_attendance_out(data: any, session_id: string){
 
    let httpOptions = {
      headers: new HttpHeaders({'x-csrftoken' : session_id }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/attendance/in/', data, httpOptions);
  }

  public logout(): Promise<void> {
    return this.storageService.removeData({});
  }
}

// https://stackoverflow.com/questions/44613463/ionic-2-returning-zone-symbol-statenull-zone-symbol-valuecyprus