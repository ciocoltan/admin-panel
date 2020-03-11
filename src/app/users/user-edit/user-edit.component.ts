import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/shared/services/users/users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserModel } from 'src/app/shared/models/UserModel';

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  public userForm: FormGroup;
  public loading: boolean = false;
  public currentUser:UserModel;
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
    private _userService: UsersService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.userEditForm();
  }
  userEditForm() {
    this._userService
      .getCurrentUser(this.activatedRoute.snapshot.params.id)
      .subscribe(res => {
        this.currentUser = res.result
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
      });
  }
  save() {
    if (this.userForm.touched && this.userForm.valid) {
      let userId = this.activatedRoute.snapshot.params.id;
      this.loading = true;
      this._userService.editForm(userId,this.userForm.value).subscribe(res => {
        this.loading = false;
        this._snackBar.open(res._meta.message, "Close", {
          panelClass: ["mat-snack-bar-containerng"]
        });
      });
    } else {
      this._snackBar.open("Not made any changes to the page!", "Close", {
        panelClass: ["mat-snack-bar-containerng"]
      });
    }
  }

  back(){
    this.router.navigate(["users"]);
  }
}
