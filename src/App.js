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
const [numPlayers, setNumPlayer]= useState('')
const [wordLength, setWordLength]= useState('')
const [word, setWord]= useState('')
const [player, setPlayer] = useState({})
  
    let display;
    if (route === 'lobby') {
      display = <Lobby setRoute={setRoute}/>
    } else if (route === 'play') {
      // display = createClient()/>
      // display = <Board />
    } else if (route === 'setup') {
      const WordJellyClient = Client({
            game: WordJellyGame,
            numPlayers: numPlayers,
            board: Board,
            //   debug: false
            multiplayer: SocketIO({ server: "localhost:8000" })
        })
      display = <WordJellyClient />

    } else if (route === 'newGame') {
      display = <NewGame setRoute={setRoute} setNumPlayer={setNumPlayer} setWordLength={setWordLength}/>
   }

    return(
      <div>
        <Navigation/>
        {display}
      </div>
      )
  }

export default App;
//       display = <GameSetUp setRoute={setRoute} wordLength={wordLength} setWord = {setWord} setPlayer={setPlayer}/>