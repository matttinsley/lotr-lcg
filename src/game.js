import { Deck } from './model/deck';
import { Card } from './model/card';
import { Game } from 'boardgame.io/core';

export const LordOfTheRings = Game({
  setup: (ctx) => {
    let deck = new Deck();
    deck.addCard(new Card("Aragorn", "player"));
    deck.addCard(new Card("Gimli", "player"));
    deck.addCard(new Card("Cirdan", "player"));
    deck.addCard(new Card("Gandalf", "player"));
    deck.addCard(new Card("Boromir", "player"));
    deck.addCard(new Card("Merry", "player"));
    deck.addCard(new Card("Denethor", "player"));

    let encounterDeck = new Deck();
    encounterDeck.addCard(new Card("goblin_axeman", "encounter"));
    encounterDeck.addCard(new Card("goblin_axeman", "encounter"));
    encounterDeck.addCard(new Card("goblin_axeman", "encounter"));

    const G = {
      controlArea: new Deck(),
      hand: new Deck(),
      deck: deck,
      encounterDeck: encounterDeck,
      stagingArea: new Deck(),
    }
    return G;
  },

  moves: {
    drawCard(G, ctx) {
      let hand = G.hand;
      let deck = G.deck;
      let card = deck.drawCard();
      if (card === undefined) {
        console.warn('Deck is empty, cannot draw card.');
        return undefined;
      }

      hand.addCard(card);
      return { ...G, hand, deck }
    },

    playCard(G, ctx, id) {
      if (id === undefined) {
        console.warn('You must specify which card to play!');
        return undefined;
      }

      let hand = G.hand; // don't mutate original state!
      let controlArea = G.controlArea;
      let card = hand.getCard(id);
      if (card === undefined) {
        console.warn('That card does not exist in your hand.');
        return undefined;
      }

      controlArea.addCard(card);
      hand.removeCard(id);
      return { ...G, hand, controlArea };
    },

    drawEncounterCard(G, ctx) {
      let encounterDeck = G.encounterDeck;
      let stagingArea = G.stagingArea;
      let card = encounterDeck.drawCard();
      if (card === undefined) {
        console.warn('Encounter deck is empty, cannot draw card.');
        return undefined;
      }

      stagingArea.addCard(card);
      return { ...G, encounterDeck, }
    },
  },


  flow: {
      endGameIf: (G, ctx) => {
          if (false) {
              return ctx.currentPlayer;
          }
      }
  }
});
