import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CurrentUserModel } from "src/app/shared/models/CurrentUserModel";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public currentUser: CurrentUserModel;
  public url: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  newUser() {
    this.router.navigate(["users/new"], { relativeTo: this.activatedRoute });
  }
  newPost() {
    this.router.navigate(["posts/new"], { relativeTo: this.activatedRoute });
  }
}
