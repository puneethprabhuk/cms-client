import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_TITLE } from '../../constants/constant';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  signInSubmitted: boolean = false;
  hidePassword = true;
  @Output() userLoggedIn = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userLoggedIn.emit(false);
    this.buildSignInForm();
  }

  buildSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required,]]
    });
  }

  get fSignIn(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }

  onSubmitSignIn() {
    this.signInSubmitted = true;
    if (this.signInForm.invalid) {
      return;
    }

    this.loginService.login(this.signInForm.value)
      .subscribe(res => {
        if (res) {
          this.userLoggedIn.emit(true);
          this.toastr.success(LOGIN_SUCCESS, LOGIN_TITLE);
        }
      }, (error) => {
        this.toastr.error(LOGIN_FAILED, LOGIN_TITLE);
        this.userLoggedIn.emit(false);
      });
  }

}
