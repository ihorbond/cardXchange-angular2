import { Component, OnInit }      from '@angular/core';
import { AuthorizationService }   from './authorization.service';
import { NgForm }                 from '@angular/forms';
import { NgClass }                from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.min.css'],
  providers: [AuthorizationService]

})
export class AppComponent implements OnInit {
  title = 'cardXchange';
  loginSignup: boolean = false;
  sideMenu: boolean = false;
  user: any;
  message: string;

  constructor(
              private auth: AuthorizationService,
              private router: Router,
              private activatedRoute: ActivatedRoute
            ) {}

  ngOnInit() {
    this.auth.isLoggedIn()
    .subscribe(user => {
                         this.user = user;
                        });
  }

  showMenus() {
    $("#footer").css("display","inherit");
    $("#menuIcon").css("display","inherit");
  }

  logout() {
   this.user = null;
   this.auth.logout()
   .subscribe(() => {
                      this.message = null;
                     },
           (err) =>   this.message = err);
  this.router.navigate(['login']);
  this.showMenu();
  }

  about() {
    this.router.navigate(['about']);
    this.showMenu();
  }

  help() {
    this.router.navigate(['help']);
    this.showMenu();
  }

  home(){
    this.router.navigate(['home']);
    this.showMenu();
  }

   showMenu() {
     if(!this.sideMenu) {
       this.sideMenu = true;
     $(".sidenav").width(140);
     $(".page-content").css("opacity", "0.5");
  }
  else {
    this.sideMenu = false;
  $(".sidenav").width(0);
  $(".page-content").css("opacity", "1");
  }
}
}
