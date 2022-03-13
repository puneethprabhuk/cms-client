import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/profile/profile.service';
import { SERVER_ERROR, SOMETHING_WENT_WRONG } from '../../constants/constant';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileDetails: any;
  userId = "";

  constructor(private headerService: HeaderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const token = JSON.stringify(localStorage.getItem('authToken')) || null;
    const helper = new JwtHelperService();
    if (token && token !== null) {
      const decodedToken = helper.decodeToken(token);
      this.userId = decodedToken.id;
      this.getProfileDetails();
    }
  }

  getProfileDetails() {
    this.headerService.getProfileDetailsData(this.userId).subscribe(profile => {
      if(profile && profile.body) {
        this.profileDetails = profile.body;
      }
    }, (error) => {
      this.toastr.error(SOMETHING_WENT_WRONG, SERVER_ERROR);
    });
  }

}
