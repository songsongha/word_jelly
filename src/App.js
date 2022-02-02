import React, { Component } from 'react';
import Lobby from './components/Lobby/Lobby';
import Navigation from './components/Navigation/Navigation';
import GamePlay from './components/GamePlay/GamePlay';
import GameSetUp from './components/GameSetUp/GameSetUp';


const App = () => {

const [route, setRoute] = React.useState('lobby')
    let display;
    if (route === 'lobby') {
      display = <Lobby setRoute={setRoute}/>
    } else if (route === 'play') {
      display = <GamePlay />
    } else if (route === 'setup') {
       display = <GameSetUp setRoute={setRoute}/>
    }

    return(
      <div>
        <Navigation/>
        {display}
      </div>
      )
  }

export default App;