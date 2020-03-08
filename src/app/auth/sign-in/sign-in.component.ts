import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginService } from "src/app/shared/services/login.service";
import { CurrentUserModel } from "src/app/shared/models/CurrentUserModel";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public hide = true;
  public hideConfirm = true;
  public loading: boolean = false;
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
    if (this.signInForm.touched && this.signInForm.valid) {
      let form: CurrentUserModel = this.signInForm.value;
      delete form.passwordConfirm;
      this.loading = true;
      this._loginService.register(form).subscribe(res => {
        this.loading = false;
      });
    }
  }
}
