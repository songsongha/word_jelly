import React from 'react';

const GameSetup = () => {
	return ( 
		<div>
			<h1>Word Jelly</h1>
			<button id = 'btnCreate'>New Game</button>
			<button id = 'btnJoin'>Join Game</button>
			<input type = 'text' id = 'txtGameId'/>
		</div>
		)
}
export default GameSetup