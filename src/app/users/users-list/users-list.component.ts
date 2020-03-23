import { Component, DoCheck } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CurrentUserModel } from "src/app/shared/models/CurrentUserModel";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements DoCheck {
  public currentUser: CurrentUserModel;
  public url: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngDoCheck() {
    this.url = this.router.routerState.snapshot.url;
  }
  newUser() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }
  newPost() {
    this.router.navigate(["posts/new"], { relativeTo: this.activatedRoute });
  }
}
