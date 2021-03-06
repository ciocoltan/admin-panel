import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";
import { AngularMaterialModule } from "../cors/angular-material/angular-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserItemComponent } from "./user-item/user-item.component";

@NgModule({
  declarations: [UserEditComponent, UserItemComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule {}
