import { Injectable }  from '@angular/core';
import { CanActivate, Router, Resolve } from '@angular/router';
import { Observable }  from 'rxjs/Rx';
import { AuthorizationService} from './authorization.service';

@Injectable()


export class AuthGuardService implements Resolve<any> {

  constructor(
    private auth: AuthorizationService,
    private router: Router
  ) { }

  resolve() {
        return this.auth.isLoggedIn()
        .catch(err => {
          this.router.navigate(['login']);
          return Observable.of(err);
        });
  }
}
