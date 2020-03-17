import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoginService } from "src/app/shared/services/login.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;
  public loading: boolean = false;
  private unSubscribe: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          )
        ]
      ],
      password: ["", [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loading = true;
      this.unSubscribe.add(
        this._loginService.login(this.loginForm.value).subscribe(res => {
          this.loading = false;
          // this._userService.responseControl(res);
        })
      );
    }
  }

  signIn() {
    this.router.navigate(["sign-in"], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
