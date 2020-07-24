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
	userDescription:FormGroup;
	userInfo = JSON.parse(localStorage.getItem('currentUser'));
	name = this.userInfo.firstName;
	time= moment().format('ll');
	fileUploadForm: FormGroup;
	fileInputLabel: string;
	allPostOfData:any = [];
	posts: any = [];
	likeflag:boolean = false;
	
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

	isLike:boolean =true;
	isDislike:boolean = false;
	like(id){
		console.log("the _id is ====>", id);
		this.posts.filter((item, index) => {
			console.log("the item of myprofile page i ===========>", item);
			if(id === item._id){
				if (this.likeflag == false) {
					this.likeflag=true;
					console.log("like called");
					this.isLike = true;
					this.isDislike = false;
					this._postService.updateUserByPostId(id, this.userInfo._id).subscribe((res:any) => {
						console.log("the res of the data is ===========>", res);
						item.likes.length = res.likes.length;
					}, (err) => {
						console.log("the res of the err is =========>", err);
					})
				}
				else{
					console.log("dislike called");
					this.isDislike = true;
					this.isLike = false;
					this.likeflag = false;
					this._postService.updateUserByPostId(id, this.userInfo._id).subscribe((res:any) => {
						console.log("the res of the data is ===========>", res);
						item.likes.length = res.likes.length;
					}, (err) => {
						console.log("the res of the err is =========>", err);
					})
				}
			}			
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
