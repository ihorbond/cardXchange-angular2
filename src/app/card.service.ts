import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class CardService {
// BASE_URL: string = 'https://cardxchange.herokuapp.com';
 BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

//get all saved contacts
  getContacts(id) {
     return this.http.get(`${this.BASE_URL}/api/contacts/${id}`, {withCredentials: true})
       .map(res => res.json());
   }

  //get user profile and cards
   getCards() {
     return this.http.get(`${this.BASE_URL}/api/profile`, {withCredentials: true})
     .map(res => res.json());
   }

   //add new own card
   addCard(newCard) {
     console.log('service', newCard);
     return this.http.post(`${this.BASE_URL}/api/profile/my-cards/add`, { ...newCard }, {withCredentials: true})
       .map(res => res.json());
   }

   //save other user's card
   saveCard(id) {
     return this.http.patch(`${this.BASE_URL}/add/${id}`, {id:id}, {withCredentials: true})
       .map(res => res.json());
   }

   //remove card from contacts
      removeContact(id) {
        return this.http.patch(`${this.BASE_URL}/api/contacts/delete/${id}`, {}, {withCredentials: true})
          .map(res => res.json());
      }

  //remove own card from cards collection
  removeCardFromCollection(id) {
    return this.http.delete(`${this.BASE_URL}/api/profile/my-cards/delete/${id}`, {withCredentials: true})
        .map(res => res.json());
  }

  //remove own card from array
  removeCardFromArray(id) {
    return this.http.patch(`${this.BASE_URL}/api/profile/my-cards/update/${id}`,{}, {withCredentials: true})
        .map(res => res.json());
  }

  //change card visibility ON/OFF
  changeVisibility(id, cardVisibility) {
    return this.http.patch(`${this.BASE_URL}/api/profile/my-cards/cv/${id}`, {visibility: cardVisibility}, {withCredentials: true})
      .map(res => res.json());
  }

  //make default
  makeDefault(id, defaultSetting) {
    return this.http.patch(`${this.BASE_URL}/api/profile/my-cards/md/${id}`, {defaultSetting: defaultSetting}, {withCredentials: true})
    .map(res => res.json());
  }


  //update own card in cards collection
   editCard(id, updatedCard) {
       return this.http.patch(`${this.BASE_URL}/api/profile/my-cards/edit/${id}`, updatedCard, {withCredentials: true})
         .map(res => res.json());
     }

//update contact note
   updateNote(id, note) {
     return this.http.patch(`${this.BASE_URL}/api/profile/contacts/add-note/${id}`, {note: note}, {withCredentials: true})
       .map(res => res.json());
   }

}
