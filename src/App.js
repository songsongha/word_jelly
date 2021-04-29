import React, { Component } from 'react';
import Card from './components/Card';
import GameSetup from './components/GameSetup';

const initialState = {
  route: 'inGame'
}

class App extends Component {

constructor(){
  super();
  this.state = initialState;
  }

  render(){
    const {route} = this.state;
    if (route === 'home') {
    return(
      <div className = 'tc'>
        <GameSetup/>
      </div> );
    } else if (route === 'inGame') {
      return(
        <div className = 'tc'> 
          <div>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <br/>
              <br/>
          </div>
          <div>
            <Card/>
          </div>
        </div> 
      );
    }
  }
}

export default App;