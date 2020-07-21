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
	isLike:boolean = true;
	Posts: any = [];
	allPost:any;
	updatePost
	postlikes:any = [];

	constructor(public _loginService: LoginService, public _postService: PostsService) { }

	ngOnInit(){
		this.allPosts();
	}

	allPosts(){
		console.log("the function called");
		this._postService.allPosts().subscribe((res) => {
			console.log("the res of allPosts", res);
			this.Posts = res;
			this.posts = res;
			this.Posts.filter((images, i) => {
				if (images.like != 0) { 
					console.log("demo");
				}
				else if (images.like != null) {
					console.log("null demo");
				}
				else {
					this.isLike = true;	
				}
			})
		}, (err) => {
			console.log("the err of allPosts", err);
		})
	}


	like(id){
		this._postService.getUserByPostId(id).subscribe((res)=> {
			console.log("the user likes of res is =====>", res);
			this.allPost = res;

			this.posts.filter((likes, index) => {
				console.log("the likes is ======>", likes);
				if (likes._id === this.allPost._id) {
					this.postlikes.push(likes.userId._id);
					this.postlikes = this.postlikes.filter((el, i, a) => i === a.indexOf(el));

					console.log("the postlikes filter is the ====>", this.postlikes);
					if (likes.like == 0 || null) {
						likes.like = this.postlikes.length;
					}
					else {
						likes.like = this.postlikes.length - 1;
					}
					this._postService.updateUserByPostId(id, likes).subscribe((res) => {
						console.log("the updatePost of user =====>", res);
					}, (err) => {
						console.log("the updatePost of err ======>", err);
					})
				}
				else {
					console.log("the conditon is wrong of likes =====", likes);
				}
			})
		}, (err) => {
			console.log("the user likes of err is =====>", err);
		})
	}
}
