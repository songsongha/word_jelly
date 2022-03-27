import React, { useState } from 'react'
import Lobby from './components/Lobby/Lobby'
import Navigation from './components/Navigation/Navigation'
import GameSetUp from './components/GameSetUp/GameSetUp'
import NewGame from './components/NewGame/NewGame'
import {WordJellyGame} from './GameLogic'
import { Client } from "boardgame.io/react"
import { SocketIO } from "boardgame.io/multiplayer"
import Board from './components/Board/Board'
// import { useNavigate } from 'react-router-dom'

// TO DO: change gameset up to an initial phase

const App = () => {
    
const [route, setRoute] = useState('lobby')
const [playerID, setPlayerID] = useState('')
const [credentials, setCredentials] = useState('')
const [clientMatchID, setClientMatchID] = useState('')
// const navigate = useNavigate()
  
    let display;
    if (route === 'lobby') {
      display = <Lobby setRoute={setRoute} setPlayerID={setPlayerID} setClientMatchID={setClientMatchID} setCredentials={setCredentials}/>
    } else if (route === 'play') {
      // navigate(`/${clientMatchID}`)
      console.log('game play')
      const WordJellyClient = Client({
            game: WordJellyGame,
            numPlayers: 6,
            board: Board,
            debug: true,
            // matchID: clientMatchID,
            multiplayer: SocketIO({ server: "localhost:8000" })
        })
      display = <WordJellyClient matchID={clientMatchID} playerID={playerID} credentials={credentials} />

    } 

    return(
      <div>
        <Navigation/>
        {display}
      </div>
      )
  }

export default App;
