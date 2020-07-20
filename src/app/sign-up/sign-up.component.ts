import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	registerForm: FormGroup;

	constructor(public _loginService: LoginService, public _router: Router
		) {	
		this.registerForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('',Validators.required),
			email: new FormControl('', Validators.required),
			password: new FormControl('',Validators.required),
			mobileNo: new FormControl('', Validators.required),
		});
	}

	ngOnInit(){
	}

	registerUser(value){
		console.log("the value is ==>", value);
		this._loginService.register(value).subscribe((res) => {
			console.log("the user response is ===>", res);
			this._router.navigate(['login']);
		}, (err) => {
			console.log("the user error is====>", err);
		});
	}
}
