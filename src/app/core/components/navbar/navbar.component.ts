import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profileDetails: any;
  
  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
  }


}
