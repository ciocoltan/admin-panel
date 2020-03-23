import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersListComponent } from "./users-list/users-list.component";
import { AngularMaterialModule } from "../cors/angular-material/angular-material.module";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PostsComponent } from './posts/posts.component';
import { UserItemComponent } from './user-item/user-item.component';
import { PostsEditComponent } from './posts-edit/posts-edit.component';

@NgModule({
  declarations: [UsersListComponent, UserEditComponent, PostsComponent, UserItemComponent, PostsEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule {}
