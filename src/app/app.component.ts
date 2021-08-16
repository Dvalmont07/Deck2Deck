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
  selectedIdex: any = { deck: "deckOne", index: 0 };

  ngOnInit() {
    this.dealDeckOne();
    this.dealDeckTwo();
  }
  dealDeckOne() {
    this.randomDeck = this.deck.mountRandomDeck();
  }
  dealDeckTwo() {
    this.normalDeck = this.deck.mountNormalDeck();
  }
  addCard(deckFrom: Card[], deckTo: Card[], card: Card) {
    if (this.selectedCard.suit && this.selectedCard.value) {
      if (this.deck.addCard({ myDeck: deckTo, card })) {
        this.deck.removeCard(deckFrom, card);
        console.log("this.selectedIdex.index 1", this.selectedIdex.index);
        console.log("TF", this.selectedIdex.index == deckFrom.length);

        if (this.selectedIdex.index == deckFrom.length) {
          this.selectedCard = deckFrom[this.selectedIdex.index - 1];
          this.selectedIdex.index--;
        } else {
          this.selectedCard = deckFrom[this.selectedIdex.index];
        }
      }
    }
  }
}

enum DeckNumber {
  One = 1,
  Two = 2,
}
