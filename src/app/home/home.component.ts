import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { PostsService } from '../services/posts.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	numberOfLikes: number = 0;
	isLike:boolean = true;
	isDislike:boolean = false;
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
			this.isLike = true;
		}, (err) => {
			console.log("the err of allPosts", err);
		})
	}

	like(id, likeflag){
		this.Posts.filter((item, index) => {
			if (id === item._id) {
				if (this.likeflag == false) {
					this.likeflag=true;
					this.isLike = true;
					this.isDislike = false;
					console.log("like called");
					this._postService.updateUserByPostId(item, this.userInfo._id).subscribe((res:any) => {
						console.log("the res of the data is ===========>", res);
						item.likes.length = res.likes.length;
					}, (err) => {
						console.log("the res of the err is =========>", err);
					})
				}
				else{
					console.log("dislike called");
					this.likeflag = false;
					this.isDislike = true;
					this.isLike = false;
					this._postService.updateUserByPostId(item, this.userInfo._id).subscribe((res:any) => {
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
