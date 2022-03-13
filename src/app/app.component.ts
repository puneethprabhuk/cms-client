import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedIn = false;

  constructor(private router: Router) {
    this.getToken();
    setTimeout(() => {
      if (this.router.url.indexOf('/login') !== -1) {
        this.loggedIn = false;
      }
    }, 100);

  }



  login(event) {
    if (event) {
      this.loggedIn = true;
      this.router.navigate(['/cms/home']);
      this.getToken();
    } else {
      this.loggedIn = false;
    }
  }

  getToken() {
    const token = JSON.stringify(localStorage.getItem('authToken'));
    const helper = new JwtHelperService();
    if (token && token !== "null") {
      const decodedToken = helper.decodeToken(token);
      const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);
      this.loggedIn = true;
      if (isExpired) {
        this.router.navigate(['login']);
        this.loggedIn = false;
      }
    } else {
      this.router.navigate(['login']);
      this.loggedIn = false;
    }
  }

}
