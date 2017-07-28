import { Component, OnInit } from '@angular/core';
import { CardService }       from '../card.service';
import { Router }            from '@angular/router';
import { AuthorizationService} from '../authorization.service';
// import { UserProfileComponent } from '../user-profile/user-profile.component';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CardService, AuthorizationService]
})
export class HomeComponent implements OnInit {
cards: any;
message: string;
user: any;
defaultCard: any;
qrcodeIcon: boolean = true;
cardUrl: string = `https://cardxchange.herokuapp.com/add/${this.user._id}`;

  constructor(
    private cardService: CardService,
    private router:      Router,
    private auth:        AuthorizationService
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
                         if (!user) this.router.navigate(['login']);
                         });
    this.cardService.getCards().subscribe(result =>
              {
                this.message = result.message;
                this.cards   = result.userInfo.cards;
                this.user    = result.userInfo;
                this.getDefaultCard(result.userInfo.cards);
              }
    )
  }

  getDefaultCard(cards) {
    cards.forEach(oneCard => {
      if (oneCard.defaultSetting) {
        this.defaultCard = oneCard;
      }
    });
  }

}
