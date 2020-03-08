import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { CurrentUserModel } from "../models/CurrentUserModel";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  async checkAuthenticated() {
     let authenticated:boolean;

     let usersArray: Array<CurrentUserModel> = JSON.parse(localStorage.getItem("users"));
    if (usersArray) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        usersArray.forEach(element => {
          if (
            element.email == currentUser.email &&
            element.password == currentUser.password
          ) {
            authenticated = true;
          }
        });
      } else {
        authenticated = false;
        console.log("nu autorizat");
      }
    }


     this.isAuthenticated.next(authenticated);
     return authenticated;







    //console.log(isAuthenticated);

  }
  login(form: CurrentUserModel) {
    let currentUser: boolean = false;
    const userObservable = new Observable<CurrentUserModel>(observer => {
      setTimeout(() => {
        observer.next(form);
        let usersArray: Array<CurrentUserModel> = JSON.parse(
          localStorage.getItem("users")
        );
        if (usersArray) {
          usersArray.forEach(element => {
            if (
              element.email == form.email &&
              element.password == form.password
            ) {
              currentUser = true;
              localStorage.setItem("currentUser", JSON.stringify(element));
              this.router.navigate(["users"]);
            }
          });

          if (!currentUser) {
            alert("Login or password is invalid");
          }
        } else {
          alert("User does not exist, please register a new user");
          this.router.navigate(["login/sign-in"]);
        }
      }, 1000);
    });
    return userObservable;
    // getUser(id: string): Observable<UsersObjResModel> {
    //     return this.http.get<UsersObjResModel>(`${this.url}/${id}`);
    //   }
    // localStorage.setItem('User', JSON.stringify(form));//il scrim
    // return this.http.get<UsersResponseModel>(form);
  }
  register(form: CurrentUserModel) {
    let currentUser: boolean = false;
    const userObservable = new Observable<CurrentUserModel>(observer => {
      setTimeout(() => {
        observer.next(form);
        let usersArray: Array<CurrentUserModel> = JSON.parse(
          localStorage.getItem("users")
        );
        if (usersArray) {
          usersArray.forEach(element => {
            if (element.email == form.email) {
              currentUser = true;
              alert("This email exists, please Log In");
              this.router.navigate(["login"]);
            }
          });
          if (!currentUser) {
            usersArray.push(form);
            localStorage.setItem("users", JSON.stringify(usersArray));
            localStorage.setItem("currentUser", JSON.stringify(form));
            this.router.navigate(["login"]);
          }
        } else {
          let newUsersArray: Array<CurrentUserModel> = [];
          newUsersArray.push(form);
          localStorage.setItem("users", JSON.stringify(newUsersArray));
          localStorage.setItem("currentUser", JSON.stringify(form));
          this.router.navigate(["login"]);
        }
      }, 1000);
    });
    return userObservable;
  }
}
