import { Component, OnInit } from '@angular/core';
import { CardService }       from '../card.service';
import { Router }            from '@angular/router';
import { AuthorizationService} from '../authorization.service';

declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.min.css'],
  providers: [CardService]
})
export class ContactsComponent implements OnInit {
  user: any;
  contacts: any;
  showNote: boolean = false;
  flipped:  boolean = false;
  message:  string;
  keyword:  string;

  constructor(
    private card: CardService,
    private auth: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.isLoggedIn()
    .subscribe(user => {
                         this.user    = user;
                         this.message = null;
                         if (!user) this.router.navigate(['login']);
                         this.getContacts(user._id);
                         });
  }

  getContacts(id) {
    this.card.getContacts(id).subscribe(result => {
    this.contacts = result.userInfo;
  });
  }

  saveNote(id) {
    let note = $(`#notes${id}`).val();
    this.card.updateNote(id, note)
      .subscribe(res => {
        this.message = res.message;
      });
    this.flip(id);
  }

  removeContact(id) {
    this.contacts.forEach((oneContact, index) => {
      if (oneContact._id.toString() === id) {
        this.contacts.splice(index, 1);
      }
    });
    this.card.removeContact(id)
    .subscribe(res => {
      this.message = res.message;
    });
  }

  flip(id) {
    $(`#card${id}`).toggleClass("flipped");
  }

  cancelNote(id) {
    this.flip(id);
  }

  expandContact(id) {
    $(`#contact${id}`).slideToggle("fast");
  }


}
