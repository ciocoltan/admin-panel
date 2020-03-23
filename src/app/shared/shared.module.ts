import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginService } from "./services/login.service";
import { JwtInterceptor } from "./interceptor/JwtInterceptor";
import { ApiUsersService } from "./services/api/apiUsers.service";
import { UserService } from "./services/users/user.service";
import { PostsService } from "./services/posts/posts.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    LoginService,
    JwtInterceptor,
    ApiUsersService,
    UserService,
    PostsService
  ]
})
export class SharedModule {}
