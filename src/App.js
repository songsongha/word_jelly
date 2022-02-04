import React, { useState } from 'react';
import Lobby from './components/Lobby/Lobby';
import Navigation from './components/Navigation/Navigation';
import GamePlay from './components/GamePlay/GamePlay';
import GameSetUp from './components/GameSetUp/GameSetUp';
import NewGame from './components/NewGame/NewGame';
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { WordJellyGame } from './GameLogic';

const App = () => {
    
const [route, setRoute] = useState('lobby')
const [numPlayers, setNumPlayer]= useState('')
const [wordLength, setWordLength]= useState('')
const [word, setWord]= useState('')
const [playerName, setPlayerName]= useState('')
  
  const WordJellyClient = Client({
    game: WordJellyGame,
    board: GamePlay,
    // debug: false,
    multiplayer: SocketIO({ server: "localhost:8000" })
  })

    let display;
    if (route === 'lobby') {
      display = <Lobby setRoute={setRoute}/>
    } else if (route === 'play') {
      display = <WordJellyClient />
      // display = <GamePlay />
    } else if (route === 'setup') {
       display = <GameSetUp setRoute={setRoute} wordLength={wordLength} setWord = {setWord} setPlayerName={setPlayerName}/>
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