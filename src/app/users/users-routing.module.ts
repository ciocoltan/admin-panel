import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserItemComponent } from "./user-item/user-item.component";

const routes: Routes = [
  {
    path: "",
    component: UserItemComponent,
    data: { breadcrumb: "Users" }
  },
  {
    path: "edit/:id",
    component: UserEditComponent,
    data: { breadcrumb: "Edit" }
  },
  {
    path: "new",
    component: UserEditComponent,
    data: { breadcrumb: "New" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
