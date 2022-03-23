import React, { useCallback, useMemo, useState } from 'react'
import { LobbyClient } from 'boardgame.io/client'

// TODO: Error handling!  What if join game doesn't match?
const Lobby = ({setRoute}) => {
	const [matchID, setMatchID] = useState('')
	const [playerName, setPlayerName] = useState('')
	const [lobbyState, setLobbyState] = useState('lobby')
	const [match, setMatch] = useState('')

	const lobbyClient = useMemo(() => { return new LobbyClient({ server: 'http://localhost:8000' })},[])

	const findMatch = useCallback(async (matchID) =>{
		if (matchID){
			const match = await lobbyClient.getMatch('word-jelly', matchID)
			console.log('match inside findMatch', match)
			setMatch(match)
		}
	},[lobbyClient])

	const joinGame = useCallback(async (matchID,playerName) => {
		console.log('join game')
		console.log({playerName})
		console.log({matchID})
		const { playerCredentials } = await lobbyClient.joinMatch(
			'word-jelly',
			matchID,
			{
			playerName
			}
		)
		findMatch(matchID)
		setLobbyState('wait')
		console.log({playerCredentials})
	},[findMatch, lobbyClient])

	const newGame = useCallback(async () =>{
		const { matchID } = await lobbyClient.createMatch('word-jelly', {
			numPlayers: 6
		})
		setMatchID(matchID)
		setLobbyState('newGame')

	},[lobbyClient])
	

	const displayMatch = useMemo(() =>{

		console.log('match inside of deplsay Match',match)
		
		if (match && match.players) {
			const playerTable = match.players.map(player => {
				const {id, name} = player
				return(
					<tr key={id}>
						<td className='ph3'>{id+1}</td>
						<td className='ph3'>{name || ''}</td>
					</tr>
				)
			})

			return (
				<div className='tc'>
					Game ID: {matchID}
					<table id='results' className='center'>
						<tbody>
							<tr>
								<th key='player'className='ph3'>Player</th>    
								<th key='word'className='ph3'>Name</th>
							</tr>
						{playerTable}
						</tbody>
					</table>
				</div>
			)
		} else {
			return (
				<div>
					Finding match...
				</div>
			)
		}
	},[match, matchID]) 

	return ( 
		<div className='tc'>
			{lobbyState === 'lobby' &&
			<div>
				<button id = 'btnCreate'onClick={newGame}>New Game</button>
				<button id = 'btnJoin' onClick={() => setLobbyState('joinGame')}>Join Game</button>
			</div>
			}
			{ lobbyState === 'newGame' &&
				<div>
					Send your friends this Game ID: <br/>
					{matchID} <br/>
					<br/>
					Your Name:<input type = 'text' id = 'txtName' onChange={(e) => {setPlayerName(e.target.value)}}/>
					<button id = 'btnJoin' onClick={() => joinGame(matchID,playerName)}>Join Game</button>
				</div>}
			{ lobbyState === 'joinGame' &&
				<div>
					Enter Game ID:
					<input type = 'text' id = 'txtGameId' onChange={(e) => {setMatchID(e.target.value)}}/>
					<button id = 'btnJoin' onClick={() => joinGame(matchID,playerName)}>Join Game</button>
				</div>
			}
			{ lobbyState === 'wait' &&
				<div>
					{displayMatch}
				</div>
			}
		</div>
		)
}
export default Lobby