import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  user = {userName: '',pass: ''}


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logIn(){
    console.log(this.user);
    this.authService.singin(this.user).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('token',res.token)
      this.router.navigate(['inicio'])
    })
  }

}
