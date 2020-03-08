import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/shared/services/users/users.service";
import { UsersResponseModel } from "src/app/shared/models/UsersResponseModel";
import { CurrentUserModel } from "src/app/shared/models/CurrentUserModel";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  public userDataArray: UsersResponseModel;
  public currentUser: CurrentUserModel;
  constructor(
    private router: Router,
    private _usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this._usersService.getUsers().subscribe(res => {
      this.userDataArray = res;
    });
  }

  edituser(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(["edit", id], { relativeTo: this.activatedRoute });
  }
}
