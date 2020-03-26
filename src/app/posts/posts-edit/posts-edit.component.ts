import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiUsersService } from "src/app/shared/services/api/apiUsers.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PostModel } from "src/app/shared/models/PostModel";
import { PostsService } from "src/app/shared/services/posts/posts.service";

@Component({
  selector: "app-posts-edit",
  templateUrl: "./posts-edit.component.html",
  styleUrls: ["./posts-edit.component.scss"]
})
export class PostsEditComponent implements OnInit, OnDestroy {
  public postForm: FormGroup;
  public loading: boolean = false;
  public currentPost: PostModel;
  public postId: string;
  private unSubscribe: Subscription = new Subscription();
  public validationMassege = {
    id: {
      required: "User Id is required"
    },
    title: {
      required: "Post title is required"
    },
    body: {
      required: "Body text is required"
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private _apiUserService: ApiUsersService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _postService: PostsService
  ) {}

  ngOnInit() {
    this.placeholderPostEditForm();
  }

  placeholderPostEditForm() {
    this.loading = !this.loading;
    this.postId = this.activatedRoute.snapshot.params.id;
    if (this.postId) {
      this.unSubscribe.add(
        this._apiUserService.getCurrentPost(this.postId).subscribe(res => {
          this.editForm(res.result);
        })
      );
    } else {
      this.unSubscribe.add(
        this._apiUserService.getPosts().subscribe(res => {
          this.editForm(res.result[0]);
        })
      );
    }
  }

  editForm(res: PostModel) {
    this.loading = !this.loading;
    this.currentPost = res;
    this.postForm = this.fb.group({
      user_id: [this.currentPost.user_id, [Validators.required]],
      title: [this.currentPost.title, [Validators.required]],
      body: [this.currentPost.body, [Validators.required]]
    });
  }

  saveUserEdit() {
    if (this.postForm.dirty && this.postForm.valid) {
      if (this.postId) {
        this.loading = !this.loading;
        this.unSubscribe.add(
          this._apiUserService
            .postEditForm(this.postId, this.postForm.value)
            .subscribe(res => {
              this.loading = !this.loading;
              this._postService.responseControl(res);
              this.router.navigate(["home/posts"]);
            })
        );
      } else {
        this.unSubscribe.add(
          this._apiUserService
            .addNewPost(this.postForm.value)
            .subscribe(res => {
              this.loading = !this.loading;
              this._postService.responseControl(res);
              this.router.navigate(["home/posts"]);
            })
        );
      }
    } else {
      this._snackBar.open("Not made any changes to the page!", "Close", {
        panelClass: ["mat-snack-bar-containerng"]
      });
    }
  }

  back() {
    this.router.navigate(["home/posts"]);
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
