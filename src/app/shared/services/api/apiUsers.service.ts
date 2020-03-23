import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersResponseModel } from "../../models/UsersResponseModel";
import { PostsResponseModel } from "../../models/PostsResponseModel";

@Injectable({
  providedIn: "root"
})
export class ApiUsersService {
  public url: string = "/users";
  public postUrl: string = "/posts";
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(this.url);
  }
  getCurrentUser(id: string): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(`${this.url}/${id}`);
  }
  getPagesUsers(pageNum: number): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(`${this.url}?page=${pageNum}`);
  }
  deleteUser(id: string): Observable<UsersResponseModel> {
    return this.http.delete<UsersResponseModel>(`${this.url}/${id}`);
  }
  editForm(id: string, form: UsersResponseModel) {
    return this.http.put<UsersResponseModel>(`${this.url}/${id}`, form);
  }
  addNewUser(form: UsersResponseModel) {
    return this.http.post<UsersResponseModel>(this.url, form);
  }
  getPosts(): Observable<PostsResponseModel> {
    return this.http.get<PostsResponseModel>(this.postUrl);
  }
  getPagesPosts(pageNum: number): Observable<PostsResponseModel> {
    return this.http.get<PostsResponseModel>(`${this.postUrl}?page=${pageNum}`);
  }
  deletePost(id: string): Observable<PostsResponseModel> {
    return this.http.delete<PostsResponseModel>(`${this.postUrl}/${id}`);
  }
  getCurrentPost(id: string): Observable<PostsResponseModel> {
    return this.http.get<PostsResponseModel>(`${this.postUrl}/${id}`);
  }
  postEditForm(id: string, form: PostsResponseModel) {
    return this.http.put<PostsResponseModel>(`${this.postUrl}/${id}`, form);
  }
  addNewPost(form: PostsResponseModel) {
    return this.http.post<PostsResponseModel>(this.postUrl, form);
  }
}
