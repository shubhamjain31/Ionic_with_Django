import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { GetSetDataService } from '../services/get-set-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  APIUrl = environment['API'];
  private httpOptions: any;

  sessionid: any;
  csrf: any;
  private user_email = new Subject<any>();

  authState = new BehaviorSubject(false);
  
  constructor(private http: HttpClient, private storageService:StorageService, private storage: Storage, private platform: Platform,
    public getSetDataService: GetSetDataService) { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

  ifLoggedIn() {
    this.storage.get('mylist').then((response) => {
      if(response === null){
        return;
      }

      if ('sessionid' in response) {
        this.authState.next(true);
      }
    });
  }

  public loginUser(credentials: any): Observable<any> {
    return this.http.post(this.APIUrl + '/login/', credentials).pipe(
      map((data: any) => data),
      switchMap(session_data => {
        this.user_email.next(session_data['email']);
        this.authState.next(true);
        this.getSetDataService.set_session_data({"sessionid": session_data['sessionid'], "csrf": session_data['csrf'], 'email': session_data['email']});
        return this.storageService.addData({"sessionid": session_data['sessionid'], "csrf": session_data['csrf'], 'email': session_data['email']}); 
      })
    );
  }

  get_user_email(): Subject<any> {
      return this.user_email;
  }

  public user_details(data: any, sessionid: string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/user/details/', data, httpOptions);
  }

  public todos_list(sessionid: string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.get(this.APIUrl + '/todos/list/', httpOptions);
  }

  public add_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/add/todo/', data, httpOptions);
  }

  public update_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/update/todo/', data, httpOptions);
  }

  public delete_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/delete/todo/', data, httpOptions);
  }

  public trash_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/trash/todo/', data, httpOptions);
  }

  public bookmark_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/bookmark/todo/', data, httpOptions);
  }

  public todo_status(data: any, session_id: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : session_id }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/todo/status/', data, httpOptions);
  }

  public user_profile(sessionid: string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.get(this.APIUrl + '/profile/', httpOptions);
  }

  public undo_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/undo/todo/', data, httpOptions);
  }

  public unarchive_todo(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/unarchive/todo/', data, httpOptions);
  }

  public todo_settings(sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.get(this.APIUrl + '/settings/', httpOptions);
  }

  public mode_change(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/change/mode/', data, httpOptions);
  }

  public todo_Add_top_or_bottom(data: any, sessionid: string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : sessionid }),
      withCredentials: true
    };
    return this.http.post(this.APIUrl + '/top-or-bottom-todo/', data, httpOptions);
  }


  public logout(): Promise<void> {
    this.authState.next(false);
    return this.storageService.removeData({});
  }

  public isAuthenticated() {
    return this.authState.value;
  }
}

// https://stackoverflow.com/questions/44613463/ionic-2-returning-zone-symbol-statenull-zone-symbol-valuecyprus