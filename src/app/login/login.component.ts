import { Component, OnInit }    from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm }               from '@angular/forms';
import { Router }               from '@angular/router';
import { AppComponent}          from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.min.css'],
  providers: [AuthorizationService, AppComponent]
})

export class LoginComponent implements OnInit {
  user: any;
  message: string;
  loginInfo: any = {
    loginEmail: '',
    loginPassword: ''
  }
  signupInfo: any = {
    fullName: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private auth: AuthorizationService,
    private app: AppComponent
  ) { }

  ngOnInit() {
  }

  signup(form: NgForm) {
    this.signupInfo.fullName = form.value.fullName;
    this.signupInfo.email    = form.value.email.toLowerCase();
    this.signupInfo.password = form.value.password;
    this.auth.signup(this.signupInfo)
    .subscribe((user => { this.user    = user;
                          this.message = null;
                          if (user) {
                            this.router.navigate(['home']);
                            this.app.showMenus();
                          }
                         }),
               (err) =>   this.message = err   );
  }


  login(form: NgForm) {
    this.loginInfo.loginEmail    = form.value.loginEmail.toLowerCase();
    this.loginInfo.loginPassword = form.value.loginPassword;
    this.auth.login(this.loginInfo)
    .subscribe((user => {
                          this.user    = user;
                          this.message = null;
                          if (user) {
                            this.app.showMenus();
                            this.router.navigate(['']);
                          }
                        }),
                          (err) => this.message = err
                        );
  }

  toggleLogin(event) {
   const option = event.target.id;

    if (option === 'emailA') {
      $('#emailLi').toggleClass('inversed-li');
      $('.email-login').slideToggle("fast");
    }

    if (option === 'linkedInA') {
      $('#linkedInLi').toggleClass('inversed-li');
      $('.linkedin-login').slideToggle("fast");
    }
    if (option === 'fingerprintA') {
      $('#fingerprintLi').toggleClass('inversed-li');
      $('.fingerprint-login').slideToggle("fast");
    }
    if (option === 'signupA') {
      $('#signupLi').toggleClass('inversed-li');
      $('.signup-login').slideToggle("fast");
    }
  }


}
