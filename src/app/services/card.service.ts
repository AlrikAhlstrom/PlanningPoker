import { Injectable } from '@angular/core';

/* created a class for card for further implementation of animation.
the cards toggleState function is to be used as state in an
animation that flips chosen Card. */

class Card {
  constructor(
    public name: string,
    public showFace: Boolean = true) {
    }
    toggleShowFace() {
      this.showFace ? this.showFace = false : this.showFace = true;
    }
}

/* took modified fibonacci sequence from exising agile planning poker decks.
Iterate over them to create an array of card class objects */

const Cards = ['?', '0', '0,5', '1', '2', '3', '5', '8', '13', '20', '40', '100'].map(name => new Card(name));

@Injectable()
export class CardService implements Iterable<Card> {

  deck: Card[] = Cards;

  // added iterator for iteration implementation of service
  [Symbol.iterator]() {
    return this.deck.values();
  }

 }
