import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { config } from '../config'; 

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(public _http: HttpClient) { }

  uploadImg(formData){
    return this._http.post<any>('http://localhost:3000/uploadfile', formData);
  }

  addPost(value){
    console.log("the value of -----------", value);
    return this._http.post( config.baseApiUrl + 'posts/addPost', value);
  }

  allPosts(){
    console.log("the allPosts value of -----------");
    return this._http.get( config.baseApiUrl + 'posts/get-all-post'); 
  }
  
  getUserById(id){
  	console.log("the getUserById of id is ==========>", id);
    return this._http.get( config.baseApiUrl + 'users/get-user-by-id/'+id); 
  }

  getUserByPostId(id){
    console.log("the getUserBypostId of id is ==========>", id);
    return this._http.get( config.baseApiUrl + 'posts/get-user-by-post-id/'+id); 
  }

  updateUserByPostId(id, value){
    var body = {
       id: id,
       userId: value
    }
    console.log("the getUserBypostId of id is ==========>", body);
    return this._http.put( config.baseApiUrl + 'posts/updateUserById ',body); 
  }
}
