import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userName: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate{

  constructor(
    private authServices: AuthService,
    public router: Router
  ){}

  canActivate(router: ActivatedRouteSnapshot):boolean{
    const expectedRole =router.data['expectedRole']
    const token:any = localStorage.getItem('token')

    const {userName, role}: JwtPayload = jwtDecode(token)
    console.log(role);

    if(!this.authServices.isAuth() || role !== expectedRole){
      console.log('Usuario no autorizado');
      this.router.navigate(['inicio']);
      return false;
    }

      return true;
  }
}
