import { Component, OnInit } from "@angular/core";
import { LoginService } from "./shared/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "admin-panel";
  public isAuthenticated: boolean;
  constructor(private _loginService: LoginService, private router: Router) {
    this._loginService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
  }
  async ngOnInit() {
    this.isAuthenticated = await this._loginService.checkAuthenticated();
  }
  logOut() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
    window.location.reload();
  }
}
