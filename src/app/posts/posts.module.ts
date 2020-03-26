import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PostsRoutingModule } from "./posts-routing.module";
import { PostsItemComponent } from "./posts-item/posts-item.component";
import { PostsEditComponent } from "./posts-edit/posts-edit.component";
import { AngularMaterialModule } from "../cors/angular-material/angular-material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PostsItemComponent, PostsEditComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class PostsModule {}
