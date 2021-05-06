import React, { Component } from 'react';
import Lobby from './components/Lobby/Lobby';
import Navigation from './components/Navigation/Navigation';
import GamePlay from './components/GamePlay/GamePlay';

const initialState = {
  route: 'lobby'
}

class App extends Component {

constructor(){
  super();
  this.state = initialState;
  }


  render(){
    const {route} = this.state;
    let display;
    if (route === 'lobby') {
      display = <Lobby />
    } else if (route === 'play') {
      display = <GamePlay />
    }

    return(
      <div>
        <Navigation/>
        {display}
      </div>
      );
  }
}

export default App;