import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiUsersService } from "src/app/shared/services/users/apiUsers.service";
import { UsersResponseModel } from "src/app/shared/models/UsersResponseModel";
import { CurrentUserModel } from "src/app/shared/models/CurrentUserModel";
import { PageEvent } from "@angular/material/paginator";
import { UserService } from "src/app/shared/services/users/user.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  public userDataArray: UsersResponseModel;
  public currentUser: CurrentUserModel;
  public pageEvent: PageEvent;
  public loading: boolean = false;
  constructor(
    private router: Router,
    private _apiUserService: ApiUsersService,
    private activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.showUsers();
  }

  showUsers() {
    this._apiUserService.getUsers().subscribe(res => {
      this.userDataArray = res;
    });
  }

  editUser(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(["edit", id], { relativeTo: this.activatedRoute });
  }

  deleteUser(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    let confirmDelete = confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      this.loading = !this.loading;
      this._apiUserService.deleteUser(id).subscribe(res => {
        this._userService.responseControl(res);
        this.showUsers();
        this.loading = !this.loading;
      });
    }
  }

  onChangePage(event: PageEvent): PageEvent {
    this.loading = !this.loading;
    this._apiUserService.getPagesUsers(event.pageIndex + 1).subscribe(res => {
      this.userDataArray = res;
      this.loading = !this.loading;
    });
    return event;
  }
}
