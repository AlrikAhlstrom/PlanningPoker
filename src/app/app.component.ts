import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Poker';
  deck = ['0', '0,5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];
  showHand: Boolean;
  chosenCard: string;
  revealed: Boolean;
  
  ngOnInit() {
    console.log('planningPoker init');
    this.showHand = true;
    this.revealed = false;
  }

  selectCard(index) {
    console.log(this.deck[index]);
    this.showHand = false;
    this.chosenCard = this.deck[index];
  }

  reveal() {
    this.revealed = true;
  }

  reset() {
    this.showHand = true;
    this.revealed = false;
  }
}