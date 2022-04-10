import React from 'react'
import { useParams } from 'react-router-dom'
import GameSetUp from './GameSetUp/GameSetUp'
import WaitForWords from './WaitForWords/WaitForWords'
import Play from './Play/Play'

const Board = ({ ctx, G, moves, playerID, events }) => {
	const {players} = G
	let { wordLength } = useParams()

	if (ctx.phase === 'setUp' && players && players[playerID] && !players[playerID].submittedWord){
		return ( 
			<div>
			<WaitForWords players={players} />
			<GameSetUp wordLength={wordLength} moves={moves} playerID={playerID} />
			</div>
			)
	} else if (ctx.phase === 'setUp' && players && players[playerID] && players[playerID].submittedWord){
		return ( 
			<WaitForWords players={players} />
			)
	}else if (ctx.phase !== 'setUp') {
		return ( 
			<Play ctx={ctx} G={G} moves={moves} playerID={playerID} events={events}/>
			)
	} 
}
export default Board