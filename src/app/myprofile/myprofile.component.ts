import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
	selector: 'app-myprofile',
	templateUrl: './myprofile.component.html',
	styleUrls: ['./myprofile.component.css']
})

export class MyprofileComponent implements OnInit {
	url:any;
	msg = "";
	name = "mohit kachhadiya";
	time="00:03";
	userDescription:FormGroup;
	userInfo = JSON.parse(localStorage.getItem('currentUser'));
	fileUploadForm: FormGroup;
	fileInputLabel: string;
	isLike:boolean = false;
	allPostOfData:any = [];
	posts: any = [];
	
	post:any = {
		userId: this.userInfo,
		time: moment().format("ll"),
		discription: "",
		image: "",
		like: ""
	}

	@ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;

	constructor(private http: HttpClient, private formBuilder: FormBuilder,	public _loginService: LoginService, 
		public _postService: PostsService
		) { 
		console.log("the currrentUser is ==========>", this.userInfo);
		this.userDescription = new FormGroup({
			discription: new FormControl('', Validators.required)
		})
	}

	ngOnInit(): void {
		this.allPosts();
		this.fileUploadForm = this.formBuilder.group({
			uploadedImage: ['']
		});
	}

	allPosts(){
		this._postService.allPosts().subscribe((res) => {
			console.log("res of allusers post ====>" , res);
			this.allPostOfData = res;
			this.allPostOfData.filter((post, i) => {
				if (post.userId._id === this.userInfo._id) {
					console.log("the post is ================>", post);
					this.posts.push(post);
				}
			});
			console.log("the allPostOfData is the ======>", this.posts);
		} , (err)=>{
			console.log("err of getAllUsers post" , err);
		});
	}


	like(id){
		console.log("the _id is ====>", id);
		this._postService.getUserByPostId(id).subscribe((res:any) => {
			console.log("the like res ===>", res);
			if (id == res._id) {
				if (res.like == 1) {
					res.like = 0;
					console.log("like");
				}
				else{
					res.like = 1;
					console.log("dislike");
				}
			}
		}, (err) => {
			console.log("the like err is ====>", err);
		})
	}

	onFileSelect(event) {
		const file = event.target.files[0];
		this.fileInputLabel = file.name;
		this.fileUploadForm.get('uploadedImage').setValue(file);

		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);reader.onload = (event) => {
			this.msg = "";
			this.url = reader.result;
		}
	}

	onFormSubmit(value) {
		if (!this.fileUploadForm.get('uploadedImage').value) {
			alert('Please fill valid details!');
			return false;
		}

		this.post.time = moment().format('ll');
		this.post.discription = value.discription;
		console.log("the post is ==========>", this.post);

		const formData = new FormData();
		formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
		formData.append('agentId', '007');

		this._postService.uploadImg(formData).subscribe((res) => {
			console.log("the resopnse of uploadImg is =====>", res);
			if (res.statusCode === 200) {
				this.uploadFileInput.nativeElement.value = "";
				this.fileInputLabel = undefined;
				this.post.image = 'http://localhost/social_share_server/' + res.uploadedFile.path;
				console.log("the post is ==========>", this.post);
				this._postService.addPost(this.post).subscribe((res) => {
					console.log("the res add post is ====>", res);
					this.posts.push(res);
				}, (err) => {
					console.log("the err add post is ====>", err);
				})	
			}
		}, (err) => {
			console.log("the error of uploadImg is ======>", err);
		});
	}
}
