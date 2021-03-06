import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginService } from "src/app/shared/services/login.service";
import { CurrentUserModel } from "src/app/shared/models/CurrentUserModel";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { Subscription } from 'rxjs';
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit, OnDestroy {
  public signInForm: FormGroup;
  public hide = true;
  public hideConfirm = true;
  public loading: boolean = false;
  private unSubscribe: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private _loginService: LoginService) {}

  ngOnInit() {
    this.registerForm();
  }
  registerForm() {
    this.signInForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      passwordConfirm: [
        "",
        [
          Validators.required,
          RxwebValidators.compare({ fieldName: "password" })
        ]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          )
        ]
      ]
    });
  }

  signIn() {
    if (this.signInForm.dirty && this.signInForm.valid) {
      let form: CurrentUserModel = this.signInForm.value;
      delete form.passwordConfirm;
      this.loading = true;
      this.unSubscribe.add(
      this._loginService.register(form).subscribe(() => {
        this.loading = false;
      }));
    }
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();

  }

}
