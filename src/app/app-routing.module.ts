import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./shared/guards/auth-guard.service";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    data: { breadcrumb: "Login" }
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { breadcrumb: "Home" },
    children: [
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then(m => m.UsersModule),
        canActivate: [AuthGuardService],
        data: { breadcrumb: "Users" }
      },
      {
        path: "posts",
        loadChildren: () =>
          import("./posts/posts.module").then(m => m.PostsModule),
        canActivate: [AuthGuardService],
        data: { breadcrumb: "Posts" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
