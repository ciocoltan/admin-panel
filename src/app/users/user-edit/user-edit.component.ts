import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/shared/services/users/users.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  public userForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this._userService
      .getCurrentUser(this.activatedRoute.snapshot.params.id)
      .subscribe(res => {
        console.log(res);
        this.userForm = this.fb.group({
          first_name: res.result.first_name,
          last_name: res.result.last_name,
          gender: res.result.gender,
          dob: res.result.dob,
          email: res.result.email,
          phone: res.result.phone,
          website: res.result.website,
          address: res.result.address,
          status: res.result.status
        });
      });
  }
}
