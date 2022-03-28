import React, { useState } from 'react'
import Lobby from './components/Lobby/Lobby'
import WordJellyClient from './WordJellyClient/WordJellyClient'
import { Route, Routes, useNavigate } from 'react-router-dom'

const App = () => {
    
const [route, setRoute] = useState('lobby')
const [playerID, setPlayerID] = useState('')
const [credentials, setCredentials] = useState('')
const [clientMatchID, setClientMatchID] = useState('')
let navigate = useNavigate()
  
if (route === 'play') {
    navigate(`/play/${clientMatchID}`)
  } 

    return(
      <div>
        <Routes>
          <Route path='/' element={
            <Lobby setRoute={setRoute} setPlayerID={setPlayerID} setClientMatchID={setClientMatchID} setCredentials={setCredentials}/>
          }/>
          <Route path='/play/:id' element={
            <WordJellyClient matchID={clientMatchID} playerID={playerID} credentials={credentials} />
          }/>
        </Routes>
      </div>
      )
  }

export default App;
