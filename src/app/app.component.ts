import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	userInfo = JSON.parse(localStorage.getItem("currentUser"));

	constructor(private route: ActivatedRoute,private router: Router, private loginService: LoginService){ 
		this.loginService.isLogin.subscribe((data) => {
			if(data === 'loggedIn') {
				this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
			}
		})
	}

	ngOnInit(){
		if(!this.userInfo){
			this.router.navigate(['/login']);
		}else{
			this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
			this.router.navigate(['/']);
		}
	}

	logout(){
		this.router.navigate(['login']);
		localStorage.removeItem('currentUser');
	}
}
