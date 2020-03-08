import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private _loginService:LoginService) {}
  async canActivate() {
    if (!await this._loginService.checkAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }
      return true;
  }
}

