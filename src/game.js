import { Deck } from './model/deck';
import { Card } from './model/card';
import { Game } from 'boardgame.io/core';
import * as cardDecks from './card_decks/player_decks'

export const LordOfTheRings = Game({
  setup: (ctx) => {
    let encounterDeck = new Deck();
    encounterDeck.addCard(Card("0a6774e7-f110-4917-84b5-1f81a7aefbf8", "Patrol Room", "encounter"));
    encounterDeck.addCard(Card("0a1166fb-fb90-4651-a8ae-7d532e41c2b6", "Fallen Stones", "encounter"));
    encounterDeck.addCard(Card("0a0e6044-c5ab-43ed-832a-71516c7d035a", "Boar Clan Stalker", "encounter"));

    let deck = new Deck();
    deck.loadPlayerDeckFromXML(cardDecks.player_deck_1);

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
});
