import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { PostsComponent } from "./posts/posts.component";
import { UserItemComponent } from "./user-item/user-item.component";
import { PostsEditComponent } from "./posts-edit/posts-edit.component";

const routes: Routes = [
  {
    path: "",
    component: UsersListComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: UserItemComponent
      },
      {
        path: "edit/:id",
        component: UserEditComponent
        // canActivate: [AuthGuardService]
      },
      {
        path: "new",
        component: UserEditComponent
        // canActivate: [AuthGuardService]
      },
      {
        path: "posts",
        children: [
          { path: "", component: PostsComponent },
          { path: "new", component: PostsEditComponent },
          { path: "edit/:id", component: PostsEditComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
