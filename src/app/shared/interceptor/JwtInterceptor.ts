import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const checkLocalhost:RegExp = /^\./;
    if (!checkLocalhost.exec(request.url)){
    if (environment.apiToken) {
      request = request.clone({
        setHeaders: { Authorization: "Bearer " + environment.apiToken }
      });
    }
    const exp = /^(http:|https:)/;
    if (!exp.exec(request.url)) {
      request = request.clone({
        url: environment.apiUrl + request.url
      });
    }
    return next.handle(request);
    }else {
      return next.handle(request);
    }

  }
}
