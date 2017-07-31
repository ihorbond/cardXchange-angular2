import { Routes }                from '@angular/router';
import { ContactsComponent }     from './contacts/contacts.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';
import { AboutComponent }        from './about/about.component';
import { LoginComponent }        from './login/login.component';
import { AppComponent }          from './app.component';
import { AddCardComponent }      from './add-card/add-card.component';
import { HelpComponent }         from './help/help.component';
import { HomeComponent }         from './home/home.component';
import { EventsComponent }       from './events/events.component';
import { AuthGuardService }      from './auth-guard.service';

export const routes: Routes = [

    { path: 'home',
      component: HomeComponent,
      resolve: [ AuthGuardService ] },
    { path: 'events',   component: EventsComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'profile',  component: UserProfileComponent },
    { path: 'about',    component: AboutComponent },
    { path: 'help',     component: HelpComponent },
    { path: 'login',    component: LoginComponent },
    { path: 'profile/add-card', component: AddCardComponent },
    { path: '',      redirectTo: 'home', pathMatch: 'full' },
    { path: '**',    redirectTo: 'home', pathMatch: 'full' }

];
