import { Deck } from './model/deck';
import { Card } from './model/card';
import { Game } from 'boardgame.io/core';

export const LordOfTheRings = Game({
  setup: (ctx) => {
    let deck = new Deck();
    deck.addCard(Card("Aragorn", "player"));
    deck.addCard(Card("Gimli", "player"));
    deck.addCard(Card("Cirdan", "player"));
    deck.addCard(Card("Gandalf", "player"));
    deck.addCard(Card("Boromir", "player"));
    deck.addCard(Card("Merry", "player"));
    deck.addCard(Card("Denethor", "player"));

    let encounterDeck = new Deck();
    encounterDeck.addCard(Card("goblin_axeman", "encounter"));
    encounterDeck.addCard(Card("patrol_room", "encounter"));
    encounterDeck.addCard(Card("boar_clan_stalker", "encounter"));

    const G = {
      controlArea: new Deck().toObject(),
      hand: new Deck().toObject(),
      deck: deck.toObject(),
      encounterDeck: encounterDeck.toObject(),
      stagingArea: new Deck().toObject(),
    }
    return G;
  },

  moves: {
    drawCard(G, ctx) {
      let hand = new Deck(G.hand);
      let deck = new Deck(G.deck);

      let card = deck.drawCard();
      if (card === undefined) {
        console.warn('Deck is empty, cannot draw card.');
        return undefined;
      }

      hand.addCard(card);
      hand = hand.toObject();
      deck = deck.toObject();
      return { ...G, hand, deck }
    },

    playCard(G, ctx, id) {
      if (id === undefined) {
        console.warn('You must specify which card to play!');
        return undefined;
      }

      let hand = new Deck(G.hand);
      let controlArea = new Deck(G.controlArea);
      let card = hand.getCard(id);
      if (card === undefined) {
        console.warn('That card does not exist in your hand.');
        return undefined;
      }

      controlArea.addCard(card);
      hand.removeCard(id);
      hand = hand.toObject();
      controlArea = controlArea.toObject();
      return { ...G, hand, controlArea };
    },

    drawEncounterCard(G, ctx) {
      let encounterDeck = new Deck(G.encounterDeck);
      let stagingArea = new Deck(G.stagingArea);
      let card = encounterDeck.drawCard();
      if (card === undefined) {
        console.warn('Encounter deck is empty, cannot draw card.');
        return undefined;
      }

      stagingArea.addCard(card);
      encounterDeck = encounterDeck.toObject();
      stagingArea = stagingArea.toObject();
      return { ...G, encounterDeck, stagingArea }
    },

    shuffleEncounterDeck(G, ctx) {
      let encounterDeck = new Deck(G.encounterDeck);
      encounterDeck.cards = ctx.random.Shuffle(encounterDeck.cards);
      encounterDeck = encounterDeck.toObject();
      return { ...G, encounterDeck }
    }
  },


  flow: {
      endGameIf: (G, ctx) => {
          if (false) {
              return ctx.currentPlayer;
          }
      }
  }
});
