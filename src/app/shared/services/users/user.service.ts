import { Injectable } from "@angular/core";
import { UsersResponseModel } from "../../models/UsersResponseModel";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _snackBar: MatSnackBar) {}

  responseControl(res: UsersResponseModel) {
    switch (res._meta.code) {
      case 200:
        this._snackBar.open(res._meta.message, "Close", {
          panelClass: ["mat-snack-bar-container"]
        });
        break;
      case 422:
        this._snackBar.open(res.result[0].message, "", {
          panelClass: ["mat-snack-bar-container-alert"]
        });
        break;
      case 204:
        this._snackBar.open("User has been deleted", "Close", {
          panelClass: ["mat-snack-bar-container"]
        });
        break;
      default:
        this._snackBar.open(
          "System error. Please contact the administrator",
          "Close",
          {
            panelClass: ["mat-snack-bar-container-alert"]
          }
        );
    }
  }
}
