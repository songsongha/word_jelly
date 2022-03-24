import React, { useCallback, useMemo, useState } from 'react'
import { LobbyClient } from 'boardgame.io/client'

// TODO: Error handling!  What if join game doesn't match?
const Lobby = ({setRoute}) => {
	const [matchID, setMatchID] = useState('')
	const [playerName, setPlayerName] = useState('')
	const [lobbyState, setLobbyState] = useState('lobby')
	const [match, setMatch] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const lobbyClient = useMemo(() => { return new LobbyClient({ server: 'http://localhost:8000' })},[])
	
	const findMatch = useCallback((matchID) =>{
		const interval = setInterval(async() => {
			if (matchID){
				try {
				const match = await lobbyClient.getMatch('word-jelly', matchID)
				console.log('match inside findMatch', match)
				setMatch(match)
				} catch (error){
					setErrorMsg('There was an issue finding the match. Please try again')
				}
			}
		}, 2000)
		return () => clearInterval(interval)
	},[lobbyClient])

	const joinGame = useCallback(async (matchID,playerName) => {
		setErrorMsg('')
		try {
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
		} catch (e) {
			setErrorMsg('There was an issue with the Game ID.  Please try again')
		}
	},[findMatch, lobbyClient])

	const newGame = useCallback(async () =>{
		try{
			const { matchID } = await lobbyClient.createMatch('word-jelly', {
				numPlayers: 6
			})
			setMatchID(matchID)
			setLobbyState('newGame')
		}catch{
			setErrorMsg('There was an issue with creating a new game. Please try again')
		}

	},[lobbyClient])
	

	const displayMatch = useMemo(() =>{
		
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
			<div className='pb3 dark-red'>
			{errorMsg}
			</div>
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
					Your Name:<input type = 'text' id = 'txtName' onChange={(e) => {setPlayerName(e.target.value)}}/>
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