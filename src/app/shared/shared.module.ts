import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginService } from "./services/login.service";
import { JwtInterceptor } from "./interceptor/JwtInterceptor";
import { UsersService } from "./services/users/users.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginService, JwtInterceptor, UsersService]
})
export class SharedModule {}
