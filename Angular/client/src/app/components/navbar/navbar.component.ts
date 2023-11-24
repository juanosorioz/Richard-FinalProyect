import { Component, OnInit, Renderer2,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuOpen: boolean = false;
  menuActive = false;

  constructor(private authservice: AuthService,
              private router: Router,
              private renderer: Renderer2,
              private zone: NgZone) { }


  ngOnInit(): void {
  }


  singout(){
    const user = this.authservice.getUser();
    this.authservice.singin(user).subscribe((res:any)=>{
      console.log(res);
      localStorage.removeItem('token')
      this.router.navigate([''])
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.renderer.setProperty(document.location, 'href', document.location.href);
          });
        }, 1000);
      });
    })
  }

  showAdminLink(): boolean {
    const expectedRole = 'admin'; // o puedes obtener esto de alguna manera dinámica si es necesario
    const userRole = this.authservice.getUserRole();

    // Muestra el enlace solo si el rol del usuario coincide con el rol esperado
    return userRole === expectedRole;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuActive = !this.menuActive;
  }

}
