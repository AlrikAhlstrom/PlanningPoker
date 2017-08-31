import { CardService } from './services/card.service';
import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate, query, stagger, keyframes, group} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('cardDealAnimation', [
       //  animate any state change ( * => *)
      transition('* => *', [
        // target elements within the trigger element (card-table) that enter the DOM (all the small cards)
        query(':enter', style({ opacity: 0}), {optional: true}),
        // stagger each cards animation 60ms
        query(':enter', stagger('60ms', [
          // follow theese keyframes in the animation
          animate('300ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(50px)',  offset: 0.1}),
            style({opacity: .1, transform: 'translateY(80px)',  offset: 0.2}),
            style({opacity: .4, transform: 'translateX(10px)',  offset: 0.3}),
            style({opacity: .8, transform: 'translateY(-15px)', offset: 0.8}),
            style({opacity: 1, transform: 'translateY(0)',  offset: 1.0}),
          ]))
        ]), {optional: true}),
        // target them when they are deleted from the DOM
        query(':leave', stagger('50ms', [
          animate('150ms ease-in', keyframes([
            style({opacity: 1, transform: 'translateX(-5px)',  offset: 0}),
            style({opacity: .8, transform: 'translateY(-20px)',  offset: 0.3}),
            style({opacity: .3, transform: 'translateY(15px)',  offset: 0.8}),
            style({opacity: 0, transform: 'translateY(-60px)',  offset: 1}),
          ]))
        ]), {optional: true})
      ])
    ]),
  ]
})

export class AppComponent implements OnInit {
  // showHand determines if all the small cards are shown
  showHand: Boolean;
  // revealed determines if the chosen card is revealed
  revealed: Boolean;
  // card class and card deck is imported from cardService.ts
  chosenCard: Card;
  cards: Card[];

  // get access to CardService via dependecy injection
  constructor(private cardService: CardService) {
    // get the card deck
    this.cards = this.cardService.deck;
  }

  ngOnInit() {
    // show all the small cards at start
    this.showHand = true;
    // the card should be face down after it is chosen
  }

  selectCard(index) {
     /* save the card before the card array is deleted.
     the card array has to be deleted for animation
     to run and make them dissapear */
    const tempCard = this.cards[index];

    // wait for chosen card to be flipped before emptying array;
    setTimeout(() => {
      this.cards = [];
    }, 100);

    // wait for cards to dissapear (cardDealFunction :leave)
    setTimeout(() => {
      this.chosenCard = tempCard;
      this.showHand = false;
      }, 850);

  }

  reset() {
    // set all default values
    this.showHand = true;
    this.chosenCard.showFace = true;
    this.cards = this.cardService.deck;
    this.revealed = false;
  }

  // TODO: fan out the cards on larger screens.
/*   setCardRotation(index) {
    const angle = this.cardStartAngle + (index * 5);
    let yPosition = 0;
    index === 0 ? yPosition = 0 : yPosition =  Math.sin( index / 3.5 ) * 60 ;
    const xPosition = index * 30;
  } */
}

interface Card {
  name: string;
  showFace: Boolean;
  toggleShowFace: MethodDecorator;
}
