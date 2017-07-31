import { Component, OnInit }     from '@angular/core';
import { AuthorizationService }  from '../authorization.service';
import { NgForm }                from '@angular/forms';
import { NgClass }               from '@angular/common';
import { Router }                from '@angular/router';
import { AppComponent }          from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  providers: [AppComponent]
})
export class NavigationMenuComponent implements OnInit {

message: string;

  constructor(
              private auth:   AuthorizationService,
              private router: Router,
              private app:    AppComponent
            ) {}

  ngOnInit() {
  }

  logout() {
   this.auth.logout()
   .subscribe(() => {},
           (err) =>   this.message = err);
  this.router.navigate(['login']);
  this.app.showMenu();
  }

}
