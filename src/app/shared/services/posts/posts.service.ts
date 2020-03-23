import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsResponseModel } from '../../models/PostsResponseModel';

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private _snackBar: MatSnackBar) {}

  responseControl(res: PostsResponseModel) {
    switch (res._meta.code) {
      case 200:
        this._snackBar.open(res._meta.message, "Close", {
          panelClass: ["mat-snack-bar-container"]
        });
        break;
      // case 422:
      //   this._snackBar.open(res.result[0].message, "", {
      //     panelClass: ["mat-snack-bar-container-alert"]
      //   });
      //   break;
      case 204:
        this._snackBar.open("Post has been deleted", "Close", {
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
