import { AfterContentInit, Component } from '@angular/core';
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
  iterableDifferOne: any;
  iterableDifferTwo: any;
  blikFirstLineOne: boolean = false;
  blikFirstLineTwo: boolean = false;
  private fragment: string = "";

  ngOnInit() {
    this.dealDeckOne();
    this.dealDeckTwo();
  }

  dealDeckOne() {
    this.deckOne = this.deck.mountRandomDeck();
    this.deckOneCopy = JSON.parse(JSON.stringify(this.deckOne));
    this.selectedCard = this.deckOneCopy[0];

  }
  dealDeckTwo() {
    this.deckTwo = this.deck.mountNormalDeck();
    this.deckTwoCopy = JSON.parse(JSON.stringify(this.deckTwo));
  }

  moveCard(deckFrom: Card[], deckTo: Card[], card: Card) {
    if (this.selectedCard.suit && this.selectedCard.value) {

      if (this.deck.addCard({ myDeck: deckTo, card })) {
        this.deck.removeCard(deckFrom, card);
        this.defineSelectedCard(deckFrom);
      }
    }
  }
  private defineSelectedCard(deckFrom: Card[]) {
    if (this.selectedIdex.index == deckFrom.length) {
      this.selectedCard = deckFrom[this.selectedIdex.index - 1];
      this.selectedIdex.index--;
    } else {
      this.selectedCard = deckFrom[this.selectedIdex.index];
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

  blinkFirstLine(deckNumber: DeckNumber) {

    if (deckNumber == DeckNumber.One) {
      this.blikFirstLineOne = true;
      setTimeout(() => {
        this.blikFirstLineOne = false;
      }, 1500);
    }
    else if (deckNumber == DeckNumber.Two) {
      this.blikFirstLineTwo = true;
      setTimeout(() => {
        this.blikFirstLineTwo = false;
      }, 1500);
    }
  }
}

enum DeckNumber {
  One = 1,
  Two = 2,
}
