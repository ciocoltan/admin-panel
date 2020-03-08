import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../cors/angular-material/angular-material.module";
import { SignInComponent } from "./sign-in/sign-in.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

@NgModule({
  declarations: [LoginComponent, SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class AuthModule {}
