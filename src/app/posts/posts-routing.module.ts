import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsItemComponent } from "./posts-item/posts-item.component";
import { PostsEditComponent } from "./posts-edit/posts-edit.component";

const routes: Routes = [
  {
    path: "",
    component: PostsItemComponent,
    data: { breadcrumb: "Posts" }
  },
  {
    path: "new",
    component: PostsEditComponent,
    data: { breadcrumb: "New" }
  },
  {
    path: "edit/:id",
    component: PostsEditComponent,
    data: { breadcrumb: "Edit" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
