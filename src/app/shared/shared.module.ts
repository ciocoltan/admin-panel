import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginService } from "./services/login.service";
import { JwtInterceptor } from "./interceptor/JwtInterceptor";
import { ApiUsersService } from "./services/users/apiUsers.service";
import { UserService } from "./services/users/user.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginService, JwtInterceptor, ApiUsersService, UserService]
})
export class SharedModule {}
