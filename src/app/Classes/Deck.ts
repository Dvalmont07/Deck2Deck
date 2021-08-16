import { Card } from "./Card";

export class Deck {
    suits: string[] = [];
    cardValues: string[] = [];

    addCard(myDeck: Card[], card: Card) {
        myDeck.push(card);
    }
    removeCard(myDeck: Card[], card: Card) {
        myDeck.unshift(card);
    }
    getCardValues() {
        return ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    }
    getSuits() {
        return ["Clubs", "Spades", "Diamonds", "Hearts"]
    }
    mountNormalDeck() {
        let myDeck: Card[] = [];
        for (let i = 0; i < this.getSuits().length; i++) {
            for (let j = 0; j < this.getCardValues().length; j++) {

                myDeck.push({ suit: this.getSuits()[i], value: this.getCardValues()[j] });
            }
        }
        return myDeck;
    }
    mountRandomDeck() {
        let myDeck: Card[] = [];

        for (let i = 0; i < 10; i++) {
            const cardSuitIndex = Math.ceil(Math.random() * this.getSuits().length - 1);
            const cardValueIndex = Math.ceil(Math.random() * this.getCardValues().length - 1);

            myDeck.push({ suit: this.getSuits()[cardSuitIndex], value: this.getCardValues()[cardValueIndex] });
        }
        console.log("this.getSuits()", Math.random() * this.getSuits().length - 1);
        return myDeck;
    }
}

