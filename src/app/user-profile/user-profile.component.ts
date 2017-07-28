import { Component, OnInit, NgModule } from '@angular/core';
import { CardService }       from '../card.service';
import { NgForm }            from '@angular/forms';
// import { AddCardComponent}   from '../add-card/add-card.component';
import { EditCardComponent } from '../edit-card/edit-card.component';
// import { Http } from '@angular/http';
import { AuthorizationService }  from '../authorization.service';
import { Router }                from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [CardService, EditCardComponent, AuthorizationService]
})
export class UserProfileComponent implements OnInit {
cards: any;
message: string;
user: string;
showEditForm: boolean = false;
cardOnId: any;
// cardVisibility: boolean = true;
// defaultCard: boolean = false;
qrcodeIcon: boolean = true;
icon: any;
editedCard: any = {
  fullName: '',
  companyName: '',
  position: '',
  phoneNum: '',
  linkedIn: '',
  email: ''
};

  constructor(
    private cardService:  CardService,
    private editCardComp: EditCardComponent,
    private auth:         AuthorizationService,
    private router:       Router
  ) { }

  ngOnInit() {
    this.auth.isLoggedIn()
    .subscribe(user => {
                         this.user    = user;
                         this.message = null;
                         if (!user) this.router.navigate(['login']);
                         });
    $('#editForm').width($('#oneCard').width());
    this.cardService.getCards().subscribe(result =>
              {
                this.message = result.message;
                this.cards   = result.userInfo.cards;
                this.user    = result.userInfo.fullName;
              }
    )
  }

  editCard(id) {
    $(`#editForm${id}`).slideToggle("slow");

}
 cancelEdit(id) {
     $(`#editForm${id}`).slideToggle("slow");
 }


//defaultCard = true switch is on
//defaultCard = false swith is off
 toggleDefault(id) {
   this.cards.forEach(oneCard => {

      if (oneCard._id.toString() === id) {
          oneCard.defaultSetting = true;
          this.cardService.makeDefault(id, true)
          .subscribe(res => {
            this.message = res.message;
          });
          this.cardOnId = id;
        }
   $(`#switch${oneCard._id}`).css({"float":"left", "background":"rgb(129, 35, 15)"});
   $(`#switchLabel${oneCard._id}`).text("OFF");
       });

       $(`#switch${this.cardOnId}`).css({"float":"right", "background": "rgb(45, 176, 109)"});
       $(`#switchLabel${this.cardOnId}`).text("ON");

 }

   // makeDefault(id) {
   //   this.cardService.makeDefault(id, this.defaultCard)
   //   .subscribe(res => {
   //     this.message = res.message;
   //   });

   // }
 

 // onOffSwitch(id) {
 //   if (this.cardVisibility) this.cardVisibility = false;
 //   else this.cardVisibility = true;
 //   // console.log("ID: " + id + " VIS: " + this.cardVisibility);
 //   this.cardService.changeVisibility(id, this.cardVisibility)
 //   .subscribe(result =>
 //             {
 //               this.message = result.message;
 //             }
 //   );
 // }

saveChanges(id, form: NgForm) {
  $(`#editForm${id}`).slideToggle("fast");
  this.editedCard.fullName    = form.value.fullName;
  this.editedCard.companyName = form.value.companyName;
  this.editedCard.position    = form.value.position;
  this.editedCard.phoneNum    = form.value.phoneNum
  this.editedCard.linkedIn    = form.value.linkedIn;
  this.editedCard.email       = form.value.email;
  // send changes to server
  this.cardService.editCard(id, this.editedCard)
  .subscribe(res => {
  this.message = res.message;
});
// update cards array here
// this is desparate! there gotta be a better way! \
// i need to reassing the cards array
this.cards.forEach((oneCard, index) => {
  if (id === oneCard._id.toString()) {
    this.cards[index].fullName     = this.editedCard.fullName;
    this.cards[index].companyName  = this.editedCard.companyName;
    this.cards[index].position     = this.editedCard.position;
    this.cards[index].phoneNum     = this.editedCard.phoneNum;
    this.cards[index].linkedIn     = this.editedCard.linkedIn;
    this.cards[index].email        = this.editedCard.email;
  }
});
}

enlargeQr(id) {
  this.cards.forEach(oneCard => {
    if(id === oneCard._id.toString()) {
    $(`#QR2${id}`).html(oneCard.QRcode);
    }
      });
      if (this.qrcodeIcon) {
        this.qrcodeIcon = false;
        $(`#QR2${id}`).slideToggle("fast");
        $(`#QR${id}`).slideToggle("slow");
      }
      else {
        this.qrcodeIcon = true;
        $(`#QR2${id}`).slideToggle("slow");
        $(`#QR${id}`).slideToggle("fast");
      }
}

  deleteCard(id) {
     //update cards collection
    this.cardService.removeCardFromCollection(id)
    .subscribe(res => {
      this.message = res.message;
    });
    //update user's cards array
    this.cardService.removeCardFromArray(id)
    .subscribe(res => {
      this.message += res.message;
      // this.cards    = res.cards;
    });
    //this is desparate! there gotta be a better way! \
  //i need to simply reassing the cards array to reflect the changes
    this.cards.forEach((oneCard, index) => {
      if(id.toString() === oneCard._id.toString()) {
        this.cards.splice(index, 1);
      }
    });
  }

}
