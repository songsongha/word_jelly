import React from 'react';
import io from 'socket.io-client';

const Lobby = ({setRoute}) => {

		// 	let clientId = null;
		// let gameId = null;
		// let playerColor = null;
		// let ws = new io("ws://localhost:9090")
		// //wiring events
		// btnJoin.addEventListener('click', e=>{
		// 	if (gameId === null){
		// 		gameId = txtGameId.value;	
		// 		//need to add some kind of error checking in case game is not valid or no gameid is entered.
		// 	}
		//  	const payLoad = {
		//  		"method": 'join',
		//  		"clientId": clientId,
		//  		"gameId": gameId
		//  	}
		//  	console.log(payLoad)
		//  	ws.send(JSON.stringify(payLoad))
		//  });

		// btnCreate.addEventListener('click', e =>{
		// 	const payLoad = {
		//  		"method": 'create',
		//  		"clientId": clientId
		//  	}
		//  	ws.send(JSON.stringify(payLoad))
		// });

		// ws.onmessage = message =>{
		// 	//message.data
		// 	const response = JSON.parse(message.data);
		// 	console.log (response);
		// 	if (response.method === 'connect') {
		// 		clientId = response.clientId;
		// 		console.log('client id set successfully' + clientId );
		// 	}

		// 	if (response.method === 'create') {
		// 		gameId = response.game.id;
		// 		console.log(response);
		// 		console.log('game successfully created with id ' + response.game.id + 'with ' + response.game.balls);
		// 	}

		// 	if (response.method === 'join') {
		// 		const game = response.game;
		// 		while(divPlayers.firstChild){
		// 				divPlayers.removeChild(divPlayers.firstChild)
		// 			}
		// 		game.clients.forEach (c => {
		// 			const d = document.createElement('div');
		// 			d.style.width = '200px';
		// 			d.style.background = c.color;
		// 			d.textContent = c.clientId;
		// 			divPlayers.appendChild(d)

		// 			if(c.clientId === clientId){
		// 				playerColor = c.color;
		// 			}
		// 		})

		// 		while(divBoard.firstChild){
		// 				divBoard.removeChild(divBoard.firstChild)
		// 			}
		// 		for(let i = 0; i< game.balls; i++){
		// 			const b = document.createElement('button');
		// 			b.textContent = i+1;
		// 			b.id = "ball"+ b.textContent;
		// 			b.style.width = '150px';
		// 			b.style.height = '150px';
		// 			b.addEventListener("click", e => {
		// 				b.style.background = playerColor;
		// 				const payLoad = {
		// 					"method": 'play',
		// 					"clientId": clientId,
		// 					"gameId": gameId,
		// 					"ballId": b.id,
		// 					"color": playerColor
		// 				}
		// 				ws.send(JSON.stringify(payLoad));
		// 			})
		// 			console.log(b);
		// 			divBoard.appendChild(b);
		// 		}
				
		// 	}
		// 	if (response.method === 'update') {
		// 		///{1: 'red', 1'}
		// 		if(!response.game.state) return;

		// 		for(const b of Object.keys(response.game.state)){
		// 			const color = response.game.state[b];
		// 			const ballObject = document.getElementById(b);
		// 			ballObject.style.backgroundColor = color;

		// 		}
		// 	}
		// }

	return ( 
		<div className='tc'>
			<button id = 'btnCreate'>New Game</button>
			<button id = 'btnJoin' onClick={() => setRoute('setup')}>Join Game</button>
			<input type = 'text' id = 'txtGameId'/>
		</div>
		)
}
export default Lobby