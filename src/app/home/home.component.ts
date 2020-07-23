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
	userInfo:any;
	userid:any;
	likeflag:boolean = false;

	constructor(public _loginService: LoginService, public _postService: PostsService) { }

	ngOnInit(){
		this.allPosts();
	}

	allPosts(){
		this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = this.userInfo._id;
		this._postService.allPosts().subscribe((res) => {
			console.log("the res of allPosts", res);
			
			this.Posts = res;
			this.posts = res;
		}, (err) => {
			console.log("the err of allPosts", err);
		})
	}

	like(id, likeflag){
		this.Posts.filter((item, index) => {
			if (id === item._id) {
				if (this.likeflag == false) {
					this.likeflag=true;
					console.log("called");
					this._postService.updateUserByPostId(id, this.userInfo._id).subscribe((res:any) => {
						console.log("the res of the data is ===========>", res);
						item.likes.length = res.likes.length;
					}, (err) => {
						console.log("the res of the err is =========>", err);
					})
				}
				else{
					this.likeflag = false;
					// console.log("discolled", item.likes.length - 1);
					this._postService.updateUserByPostId(id, this.userInfo._id).subscribe((res:any) => {
						console.log("the res of the data is ===========>", res);
						item.likes.length = res.likes.length;
					}, (err) => {
						console.log("the res of the err is =========>", err);
					})

				}
			}
		});
		console.log("the Posts of the data ----------->", this.Posts);
	}
}
