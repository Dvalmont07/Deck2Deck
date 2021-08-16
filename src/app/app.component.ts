import { Component } from '@angular/core';
import { Card } from './Classes/Card';
import { Deck } from './Classes/Deck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private deck: Deck) { }

  title = 'Deck2Deck';
  normalDeck: Card[] = [];
  randomDeck: Card[] = [];
  selectedCard: Card = { suit: "", value: "" };

  ngOnInit() {
    this.dealRandomDeck();
    this.dealNormalDeck();
    console.log("fff", this.randomDeck);
  }

  dealRandomDeck() {
    this.randomDeck = this.deck.mountRandomDeck();
  }
  dealNormalDeck() {
    this.normalDeck = this.deck.mountNormalDeck();
  }
  addCard(deckTo: Card[], card: Card) {
    this.deck.addCard(deckTo, card);
  }
}
