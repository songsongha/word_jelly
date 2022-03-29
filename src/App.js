import React, { useState } from 'react'
import Lobby from './components/Lobby/Lobby'
import WordJellyClient from './WordJellyClient/WordJellyClient'
import { Route, Routes} from 'react-router-dom'

const App = () => {

const [numPlayers, setNumPlayers] = useState('6')

    return(
      <div>
        <Routes>
          <Route path='/' element={
            <Lobby numPlayers={numPlayers} setNumPlayers={setNumPlayers}/>
          }/>
          <Route path='/play/:wordLength/:id' element={
            <WordJellyClient numPlayers={numPlayers}/>
          }/>
        </Routes>
      </div>
      )
  }

export default App;
