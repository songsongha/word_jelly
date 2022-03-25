import React, { useState } from 'react';
import Lobby from './components/Lobby/Lobby';
import Navigation from './components/Navigation/Navigation';
import GameSetUp from './components/GameSetUp/GameSetUp';
import NewGame from './components/NewGame/NewGame';
import {WordJellyGame} from './GameLogic';
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import Board from './components/Board/Board'

// TO DO: change gameset up to an initial phase

const App = () => {
    
const [route, setRoute] = useState('lobby')
const [playerId, setPlayerId] = useState({})
const [playerCredentials, setPlayerCredentials] = useState('')
  
    let display;
    if (route === 'lobby') {
      display = <Lobby setRoute={setRoute} setPlayerCredentials={{setPlayerCredentials}}/>
    } else if (route === 'play') {
      const WordJellyClient = Client({
            game: WordJellyGame,
            numPlayers: 6,
            board: Board,
            debug: true,
            multiplayer: SocketIO({ server: "localhost:8000" })
        })
      display = <WordJellyClient playerID={playerId} />

    } else if (route === 'newGame') {
      display = <NewGame setRoute={setRoute} setPlayerId={setPlayerId} playerCredentials={playerCredentials}/>
   }

    return(
      <div>
        <Navigation/>
        {display}
      </div>
      )
  }

export default App;
