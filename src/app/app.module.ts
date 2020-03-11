import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AngularMaterialModule } from "./cors/angular-material/angular-material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./shared/interceptor/JwtInterceptor";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
