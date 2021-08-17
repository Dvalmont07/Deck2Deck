import { JsonPipe } from '@angular/common';
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
  selectedCard: Card = { suit: "", value: "", order: 0 };
  selectedIdex: any = { deck: "deckOne", index: 0 };
  deckOneCopy: string = "";

  ngOnInit() {
    this.dealDeckOne();
    this.dealDeckTwo();
  }
  dealDeckOne() {
    this.randomDeck = this.deck.mountRandomDeck();
    this.deckOneCopy = JSON.stringify(this.randomDeck);

  }
  dealDeckTwo() {
    this.normalDeck = this.deck.mountNormalDeck();
  }
  addCard(deckFrom: Card[], deckTo: Card[], card: Card) {
    if (this.selectedCard.suit && this.selectedCard.value) {
      if (this.deck.addCard({ myDeck: deckTo, card })) {
        this.deck.removeCard(deckFrom, card);

        if (this.selectedIdex.index == deckFrom.length) {
          this.selectedCard = deckFrom[this.selectedIdex.index - 1];
          this.selectedIdex.index--;
        } else {
          this.selectedCard = deckFrom[this.selectedIdex.index];
        }
      }
    }
  }


  shuffleDeck(myDeck: Card[]) {

    let orderList: number[] = [];
    for (let i = 0; i < myDeck.length;) {
      const randomNum = Math.ceil(Math.random() * myDeck.length - 1);
      if (orderList.indexOf(randomNum) == -1 && randomNum >= 0) {
        orderList.push(randomNum);
        i++;
      }
    }

    for (let i = 0; i < myDeck.length; i++) {
      myDeck[i].order = orderList[i];
    }
    myDeck.sort((a, b) => { return a.order - b.order })
  }

  resetDeckOne() {
    let auxDeck = JSON.parse(this.deckOneCopy);
    for (let i = 0; i < auxDeck.length; i++) {
      this.randomDeck[i] = auxDeck[i];
    }
  }
  resetDeckTwo() {
    this.dealDeckTwo();
  }
}

enum DeckNumber {
  One = 1,
  Two = 2,
}
