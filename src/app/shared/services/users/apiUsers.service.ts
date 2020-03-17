import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersResponseModel } from "../../models/UsersResponseModel";
import { SentUserModel } from '../../models/SentUserModel';

@Injectable({
  providedIn: "root"
})
export class ApiUsersService {
  public url: string = "/users";
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
}
