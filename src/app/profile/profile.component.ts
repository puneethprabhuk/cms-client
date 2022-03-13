import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../core/components/header/header.service';
import { CONTACT_NUMBER_REGEX, NAME_REGEX, PASSWORD_REGEX, SOMETHING_WENT_WRONG, UPDATE_CLIENT_MESSAGE, UPDATE_PROFILE_MESSAGE, UPDATE_PROFILE_TITLE } from '../core/constants/constant';
import { ProfileService } from './profile.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profileDetails: any;
  hidePassword = true;
  hideConfPassword = true;
  selectedFile: ImageSnippet;
  userId = "";
  changePasswordEnabled = false;

  constructor(private profileService: ProfileService,
    private headerService: HeaderService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.buildProfileForm();
    const token = JSON.stringify(localStorage.getItem('authToken')) || null;
    const helper = new JwtHelperService();
    if (token && token !== null) {
      const decodedToken = helper.decodeToken(token);
      this.userId = decodedToken.id;
      this.getProfileDetails();
    }
  }


  buildProfileForm() {
    this.profileForm = this.fb.group({
      firstName: [
        this.profileDetails?.firstName ? this.profileDetails?.firstName : '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(NAME_REGEX)
        ]
      ],
      lastName: [
        this.profileDetails?.lastName ? this.profileDetails?.lastName : '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(NAME_REGEX)
        ]
      ],
      email: [
        this.profileDetails?.email ? this.profileDetails?.email : '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50)
        ]
      ],
      contactNumber: [
        this.profileDetails?.contactNumber ? this.profileDetails?.contactNumber : '',
        [
          Validators.required,
          Validators.pattern(CONTACT_NUMBER_REGEX)
        ]
      ]
    }
      // { validator: this.passwordConfirming }
    );
  }

  getProfileDetails() {
    this.headerService.getProfileDetailsData(this.userId).subscribe(profile => {
      if(profile && profile.body) {
        this.profileDetails = profile.body;
      }
      this.buildProfileForm();
    });
  }

  updateProfile() {
    if (this.selectedFile) {
      this.profileForm.value.image = this.selectedFile.src;
    } else {
      this.profileForm.value.image = "";
    }
    this.profileService.updateProfile(this.userId, this.profileForm.value).subscribe(res => {
      this.getProfileDetails();
      this.toastr.success(UPDATE_CLIENT_MESSAGE, UPDATE_PROFILE_TITLE);
    }, (error) => {
      this.toastr.error(SOMETHING_WENT_WRONG, UPDATE_PROFILE_TITLE);
    });
  }

  
  processFile(imageInput: any) {
    let file: File = imageInput.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      event.target.value = "";
    });
    reader.readAsDataURL(file);
  }

  // passwordConfirming(c: AbstractControl): { invalid: boolean } {
  //   if (c.get('password').value !== c.get('confirmPassword').value) {
  //     return { invalid: true };
  //   }
  // }

  removeImage() {
    this.profileDetails.image = "";
    this.selectedFile = null;
  }


}
