import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { CurrentUserModel } from "../models/CurrentUserModel";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  async checkAuthenticated() {
    let authenticated: boolean;

    let usersArray: Array<CurrentUserModel> = JSON.parse(
      localStorage.getItem("users")
    );
    if (usersArray) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        let userAuthenticated = usersArray.find(
          x =>
            x.userName === currentUser.userName &&
            x.password === currentUser.password
        );
        if (userAuthenticated) {
          authenticated = true;
        }
      } else {
        authenticated = false;
      }
    }
    this.isAuthenticated.next(authenticated);
    return authenticated;
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
              element.email === form.email &&
              element.password === form.password
            ) {
              currentUser = true;
              localStorage.setItem("currentUser", JSON.stringify(element));
              this.router.navigate(["users"]);
            }
          });
          if (!currentUser) {
            this._snackBar.open("Username or password is incorrect!", "Close", {
              panelClass: ["mat-snack-bar-container"]
            });
          }
        } else {
          this._snackBar.open(
            "User does not exist, please register a new user!",
            "Close",
            {
              panelClass: ["mat-snack-bar-container"]
            }
          );
          this.router.navigate(["login/sign-in"]);
        }
      }, 1000);
    });
    return userObservable;
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
          let userExists = usersArray.find(x => x.password === form.password);
          if (!userExists) {
            currentUser = true;
            this._snackBar.open("This email exists, please Log In!", "Close", {
              panelClass: ["mat-snack-bar-container"]
            });
            this.router.navigate(["login"]);
          }
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
