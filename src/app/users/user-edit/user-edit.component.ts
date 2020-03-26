import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiUsersService } from "src/app/shared/services/api/apiUsers.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserModel } from "src/app/shared/models/UserModel";
import { UserService } from "src/app/shared/services/users/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  public loading: boolean = false;
  public currentUser: UserModel;
  public userId: string;
  private unSubscribe: Subscription = new Subscription();
  public statusUser: Array<string> = ["active", "inactive"];
  public genderUser: Array<string> = ["male", "female"];
  public validationMassege = {
    first_name: {
      required: "First name is required",
      minlength: " Значение должно быть не менее 3х символов."
    },
    last_name: {
      required: "Обязательное поле.",
      minlength: " Значение должно быть не менее 3х символов."
    },
    dob: {
      required: "Обязательное поле."
    },
    phone: { required: "Обязательное поле." },
    email: {
      required: "Обязательное поле.",
      pattern: "Неверно введен электронный емайл."
    },
    website: { required: "Обязательное поле." },
    address: { required: "Обязательное поле." }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private _apiUserService: ApiUsersService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.placeholderUserEditForm();
  }

  placeholderUserEditForm() {
    this.loading = !this.loading;
    this.userId = this.activatedRoute.snapshot.params.id;
    if (this.userId) {
      this.unSubscribe.add(
        this._apiUserService.getCurrentUser(this.userId).subscribe(res => {
          this.editForm(res.result);
        })
      );
    } else {
      this.unSubscribe.add(
        this._apiUserService.getUsers().subscribe(res => {
          this.editForm(res.result[0]);
        })
      );
    }
  }

  editForm(res: UserModel) {
    this.loading = !this.loading;
    this.currentUser = res;
    this.userForm = this.fb.group({
      first_name: [
        this.currentUser.first_name,
        [Validators.minLength(3), Validators.required]
      ],
      last_name: [
        this.currentUser.last_name,
        [Validators.minLength(3), Validators.required]
      ],
      gender: [this.currentUser.gender],
      dob: [this.currentUser.dob],
      email: [
        this.currentUser.email,
        [
          Validators.required,
          Validators.pattern(
            "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          )
        ]
      ],
      phone: [this.currentUser.phone, [Validators.required]],
      website: [this.currentUser.website],
      address: [this.currentUser.address, [Validators.required]],
      status: [this.currentUser.status]
    });
  }

  saveUserEdit() {
    if (this.userForm.dirty && this.userForm.valid) {
      // let userId = this.activatedRoute.snapshot.params.id;
      if (this.userId) {
        this.loading = !this.loading;
        this.unSubscribe.add(
          this._apiUserService
            .editForm(this.userId, this.userForm.value)
            .subscribe(res => {
              this.loading = !this.loading;
              this._userService.responseControl(res);
              this.router.navigate(["home/users"]);
            })
        );
      } else {
        this.unSubscribe.add(
          this._apiUserService
            .addNewUser(this.userForm.value)
            .subscribe(res => {
              this.loading = !this.loading;
              this._userService.responseControl(res);
              this.router.navigate(["home/users"]);
            })
        );
      }
    } else {
      this._snackBar.open("Not made any changes to the page!", "Close", {
        panelClass: ["mat-snack-bar-containerng"]
      });
    }
  }

  back() {
    this.router.navigate(["home/users"]);
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
