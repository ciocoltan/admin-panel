import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";

const routes: Routes = [
  {
    path: "",
    component: UsersListComponent
  },
  {
    path: "edit/:id",
    component: UserEditComponent
  },
  {
    path: "new",
    component: UserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
