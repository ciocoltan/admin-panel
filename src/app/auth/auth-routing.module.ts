import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
