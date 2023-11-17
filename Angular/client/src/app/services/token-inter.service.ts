import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterService implements HttpInterceptor {

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }){
    const token = localStorage.getItem('token')
    console.log(token);
    const tokenHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(tokenHeader)

  }

  constructor() {
    console.log();
   }
}
