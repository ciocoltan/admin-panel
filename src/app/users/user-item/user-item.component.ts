import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersResponseModel } from "src/app/shared/models/UsersResponseModel";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiUsersService } from "src/app/shared/services/api/apiUsers.service";
import { UserService } from "src/app/shared/services/users/user.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-user-item",
  templateUrl: "./user-item.component.html",
  styleUrls: ["./user-item.component.scss"]
})
export class UserItemComponent implements OnInit, OnDestroy {
  public userDataArray: UsersResponseModel;
  public loading: boolean = false;
  private unSubscribe: Subscription = new Subscription();
  public pageEvent: PageEvent;
  constructor(
    private router: Router,
    private _apiUserService: ApiUsersService,
    private activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.showUsers();
  }

  showUsers() {
    this.unSubscribe.add(
      this._apiUserService.getUsers().subscribe(res => {
        this.userDataArray = res;
      })
    );
  }
  editUser(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(["edit", id], { relativeTo: this.activatedRoute });
  }

  deleteUser(id: string, event: Event) {
    event.stopPropagation();
    let confirmDelete = confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      this.loading = !this.loading;
      this.unSubscribe.add(
        this._apiUserService.deleteUser(id).subscribe(res => {
          this._userService.responseControl(res);
          this.showUsers();
          this.loading = !this.loading;
        })
      );
    }
  }

  onChangePage(event: PageEvent): PageEvent {
    this.loading = !this.loading;
    this.unSubscribe.add(
      this._apiUserService.getPagesUsers(event.pageIndex + 1).subscribe(res => {
        this.userDataArray = res;
        this.loading = !this.loading;
      })
    );
    return event;
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
