import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PostsService } from '../services/posts.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	posts:any = [];
	numberOfLikes: number = 0;
	isLike:boolean = false;

	constructor(public _loginService: LoginService, public _postService: PostsService) { }

	ngOnInit(){
		this.allPosts();
	}

	allPosts(){
		console.log("the function called");
		this._postService.allPosts().subscribe((res) => {
			console.log("the res of allPosts", res);
			this.posts = res;
		}, (err) => {
			console.log("the err of allPosts", err);
		})
	}

	like(id){
		this.isLike = true;
		if (this.numberOfLikes == 0) {
			this.numberOfLikes++;
			console.log("the numberOfLikes is =====>", this.numberOfLikes);
		}
		else{
			this.numberOfLikes--;
			console.log("the numberOfdisLikes is =====>", this.numberOfLikes);
		}
	}
}
