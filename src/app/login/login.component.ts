import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	err:boolean = false;
	errMessage = "Please Check your Email/Password and try again";

	constructor(public _loginService: LoginService, public _router: Router) {	
		this.loginForm = new FormGroup({
			email: new FormControl('', Validators.required),
			password: new FormControl('',Validators.required)
		});
	}

	ngOnInit(): void {
	}

	loginUser(value){
		console.log("the value is =====>", value);
		this._loginService.login(value).subscribe((res) => {
			console.log("the user respnse is ===>", res);
			localStorage.setItem('currentUser', JSON.stringify(res));
			this._router.navigate(['']);
			this.err = false;
		}, (err) => {
			this.err = true;
			console.log("the user error is====>", err);
		});
	}
}
