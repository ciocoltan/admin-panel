import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoginService } from "src/app/shared/services/login.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;
  public loading: boolean = false;
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
    if (this.loginForm.touched && this.loginForm.valid) {
      this.loading = true;
      this._loginService.login(this.loginForm.value).subscribe(res => {
        this.loading = false;
      });
    }
  }
  signIn() {
    this.router.navigate(["sign-in"], { relativeTo: this.activatedRoute });
  }
}
