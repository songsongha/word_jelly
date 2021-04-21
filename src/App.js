import React, { Component } from 'react';
import Card from './components/Card';

class App extends Component {

constructor(){
  super()
  this.state = {

  }
}
  render(){
      return(
        <div className = 'tc'>
          <h1 className='f1'> Word Jelly </h1>
          <div>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
          </div>
          <br/>
          <br/>
          <div>
              <Card/>
          </div>
        </div>
      );
  }
}
export default App;