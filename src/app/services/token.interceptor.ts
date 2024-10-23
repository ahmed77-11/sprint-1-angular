import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exclude_array:string[]=["/login","/register","/verifyEmail"];

  constructor() {}

  toExclude(url:string):boolean {
    var length=this.exclude_array.length;
    for (let i = 0; i < length; i++) {
      if(url.search(this.exclude_array[i])!=-1) {
        return true;
      }
    }
    return false;

  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const toExclude="/login";
    if(request.url.search(toExclude)==-1) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', jwt),
        });
        return next.handle(cloned);
      }
    }
    return next.handle(request);
  }
}
