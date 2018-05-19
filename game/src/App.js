import { Client } from 'boardgame.io/react';
import { LordOfTheRings } from './game';
import { LordOfTheRingsBoard } from './components/board';


const App = Client({
    game: LordOfTheRings,
    board: LordOfTheRingsBoard,
    numPlayers: 1,
});

export default App;
