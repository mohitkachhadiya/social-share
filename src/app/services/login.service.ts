import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { config } from '../config'; 
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	isLogin: EventEmitter<any> = new EventEmitter<any>();
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;
  
  constructor(public _http: HttpClient) { 
	this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
	this.currentUser = this.currentUserSubject.asObservable();
  }

  	public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

  login(value){
  	console.log("the value in service is ====>", value);
  	return this._http.post(	config.baseApiUrl + "users/login" ,value)
  	.pipe(map(user => {
			console.log("the login user of data =========>", user);
			if (user) {
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.isLogin.emit('loggedIn');
				this.currentUserSubject.next(user);
			}
			return user;
		}));
  }

  register(value){
  	console.log("the value in service is ====>", value);
  	return this._http.post(	config.baseApiUrl + "users/sign-up" ,value);
  }	
}
