import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
	{
		path:"",
		component : HomeComponent
	},
	{
		path:"login",
		component : LoginComponent
	},
	{
		path:"sign-up",
		component : SignUpComponent
	},
	{
		path:"my-profile",
		component : MyprofileComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
