import React from 'react';
import { LobbyClient } from 'boardgame.io/client';

const newGame = async () =>{
	const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' })
	const { matchID } = await lobbyClient.createMatch('word-jelly', {
		numPlayers: 6
	  });
console.log({matchID})
}
const Lobby = ({setRoute}) => {
		
	return ( 
		<div className='tc'>
			<button id = 'btnCreate'onClick={newGame}>New Game</button>
			<button id = 'btnJoin' onClick={() => setRoute('setup')}>Join Game</button>
			<input type = 'text' id = 'txtGameId'/>
		</div>
		)
}
export default Lobby