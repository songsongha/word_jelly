import React, { useState } from 'react'
import Lobby from './components/Lobby/Lobby'
import WordJellyClient from './WordJellyClient/WordJellyClient'
import { Route, Routes} from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import Rules from './components/Rules/Rules'
import Navigation from './components/Navigation/Navigation'
import usePageTracking from './usePageTracking'

const { protocol, hostname, port } = window.location
const server = `${protocol}//${hostname}:${port}`

const App = () => {
  usePageTracking()
  const [numPlayers, setNumPlayers] = useState(6)
  const lobbyClient =  new LobbyClient({ server: server })
  const [showRules, setShowRules] = useState(true)

    return(
    <div>
      <Navigation showRules={showRules}/>
      <div>
        <Routes>
          <Route path='/' element={
            <Lobby numPlayers={numPlayers} setNumPlayers={setNumPlayers} lobbyClient={lobbyClient} setShowRules={setShowRules}/>
          }/>
          <Route path='/play/:wordLength/:id' element={
            <WordJellyClient numPlayers={numPlayers} lobbyClient={lobbyClient} setShowRules={setShowRules}/>
          }/>
          <Route path='/rules' element={
            <Rules setShowRules={setShowRules}/>
          }/>
        </Routes>
      </div>
    </div>
      )
  }

export default App;

