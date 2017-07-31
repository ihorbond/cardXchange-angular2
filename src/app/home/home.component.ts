import { Component, OnInit }   from '@angular/core';
import { CardService }         from '../card.service';
import { Router }              from '@angular/router';
import { AuthorizationService} from '../authorization.service';
import { AppComponent }        from '../app.component';
// import { UserProfileComponent } from '../user-profile/user-profile.component';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CardService, AuthorizationService, AppComponent]
})
export class HomeComponent implements OnInit {
cards: any;
message: string;
user: any;
defaultCard: any;
qrcodeIcon: boolean = true;
cardUrl: string;

  constructor(
    private cardService: CardService,
    private router:      Router,
    private auth:        AuthorizationService,
    private app:         AppComponent
  ) { }

  enlargeQr() {
      $(".QRcode").html(this.defaultCard.QRcode);
      $(".QRcode").slideToggle("fast");
  }

  ngOnInit() {
    this.auth.isLoggedIn()
    .subscribe(user => {
                         this.user    = user;
                         this.message = null;
                         });
    this.cardService.getCards().subscribe(result =>
              {
                this.message = result.message;
                this.cards   = result.userInfo.cards;
                this.getDefaultCard(result.userInfo.cards);
              }
    )
  }

  getDefaultCard(cards) {
    cards.forEach(oneCard => {
      if (oneCard.defaultSetting) {
        this.defaultCard = oneCard;
        this.cardUrl = `https://cardxchange.herokuapp.com/add/${oneCard._id}`;
      }
    });
    // location.reload();
  }

}
