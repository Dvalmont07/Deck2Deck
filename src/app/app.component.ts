import { Component } from '@angular/core';
import { Deck } from './Classes/Deck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private deck: Deck) { }

  title = 'Deck2Deck';
  normalDeck: any = [];
  randomDeck: any = []

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
}
