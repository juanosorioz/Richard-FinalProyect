import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class SessionGuard implements CanActivate{

  constructor(
    private authServices: AuthService,
    private router: Router
  ){}

  canActivate():boolean{
    if(this.authServices.isAuth()){
      console.log('Ya iniciaste session');
      this.router.navigate(['inicio'])
      return true;
    }
      return false;
  }
}
