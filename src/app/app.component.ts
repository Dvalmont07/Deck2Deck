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
  deckOne: Card[] = [];
  deckTwo: Card[] = [];

  selectedCard: Card = { suit: "", value: "", order: 0 };
  selectedIdex: any = { deck: "deckOne", index: 0 };
  deckOneCopy: Card[] = [];
  deckTwoCopy: Card[] = [];

  ngOnInit() {
    this.dealDeckOne();
    this.dealDeckTwo();
  }
  dealDeckOne() {
    this.deckOne = this.deck.mountRandomDeck();
    this.deckOneCopy = JSON.parse(JSON.stringify(this.deckOne));

  }
  dealDeckTwo() {
    this.deckTwo = this.deck.mountNormalDeck();
    this.deckTwoCopy = JSON.parse(JSON.stringify(this.deckTwo));
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
    this.deckOneCopy = [];
    for (let i = 0; i < this.deckOne.length; i++) {
      this.deckOneCopy[i] = this.deckOne[i];
    }

  }
  resetDeckTwo() {
    this.deckTwoCopy = [];
    for (let i = 0; i < this.deckTwo.length; i++) {
      this.deckTwoCopy[i] = this.deckTwo[i];
    }
  }
}

enum DeckNumber {
  One = 1,
  Two = 2,
}
