import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiUsersService } from "src/app/shared/services/api/apiUsers.service";
import { PostsResponseModel } from "src/app/shared/models/PostsResponseModel";
import { PageEvent } from "@angular/material/paginator";
import { PostsService } from "src/app/shared/services/posts/posts.service";
import { UserModel } from "src/app/shared/models/UserModel";

@Component({
  selector: "app-posts",
  templateUrl: "./posts-item.component.html",
  styleUrls: ["./posts-item.component.scss"]
})
export class PostsItemComponent implements OnInit, OnDestroy {
  public userPostsArray: PostsResponseModel;
  public loading: boolean = false;
  public currentUserPost: UserModel;
  private unSubscribe: Subscription = new Subscription();
  public pageEvent: PageEvent;
  constructor(
    private router: Router,
    private _apiUserService: ApiUsersService,
    private activatedRoute: ActivatedRoute,
    private _postService: PostsService
  ) {}

  ngOnInit() {
    this.showUsersPosts();
  }

  showUsersPosts() {
    this.unSubscribe.add(
      this._apiUserService.getPosts().subscribe(res => {
        this.userPostsArray = res;
      })
    );
  }
  editPost(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(["edit", id], {
      relativeTo: this.activatedRoute
    });
  }
  getUser(event: Event, userId: string) {
    event.stopPropagation();
    this.loading = !this.loading;
    this.unSubscribe.add(
      this._apiUserService.getCurrentUser(userId).subscribe(res => {
        this.currentUserPost = res.result;
        this.loading = !this.loading;
      })
    );
  }
  deletePost(id: string, event: Event) {
    event.stopPropagation();
    let confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      this.loading = !this.loading;
      this.unSubscribe.add(
        this._apiUserService.deletePost(id).subscribe(res => {
          this._postService.responseControl(res);
          this.showUsersPosts();
          this.loading = !this.loading;
        })
      );
    }
  }

  onChangePage(event: PageEvent): PageEvent {
    this.loading = !this.loading;
    this.unSubscribe.add(
      this._apiUserService.getPagesPosts(event.pageIndex + 1).subscribe(res => {
        this.userPostsArray = res;
        this.loading = !this.loading;
      })
    );
    return event;
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
