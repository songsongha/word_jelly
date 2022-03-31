import React, { useState } from 'react'
import Lobby from './components/Lobby/Lobby'
import WordJellyClient from './WordJellyClient/WordJellyClient'
import { Route, Routes} from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'

const App = () => {

const [numPlayers, setNumPlayers] = useState('6')
const lobbyClient =  new LobbyClient({ server: 'http://localhost:8000' })

    return(
      <div>
        <Routes>
          <Route path='/' element={
            <Lobby numPlayers={numPlayers} setNumPlayers={setNumPlayers} lobbyClient={lobbyClient}/>
          }/>
          <Route path='/play/:wordLength/:id' element={
            <WordJellyClient numPlayers={numPlayers} lobbyClient={lobbyClient}/>
          }/>
        </Routes>
      </div>
      )
  }

export default App;
