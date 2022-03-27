import React, { useCallback, useMemo, useState } from 'react'
import { LobbyClient } from 'boardgame.io/client'

const Lobby = ({setRoute, setPlayerID, setClientMatchID, setCredentials}) => {
	const [matchID, setMatchID] = useState('')
	const [playerName, setPlayerName] = useState('')
	const [lobbyState, setLobbyState] = useState('lobby')
	const [match, setMatch] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [playerCred, setPlayerCred] = useState('')

	const lobbyClient = useMemo(() => { return new LobbyClient({ server: 'http://localhost:8000' })},[])
	
	const findMatch = useCallback((matchID) =>{
		setErrorMsg('')
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
			const playerCred = await lobbyClient.joinMatch(
				'word-jelly',
				matchID,
				{
				playerName
				}
			)
			findMatch(matchID)
			setLobbyState('wait')
			setPlayerCred(playerCred)
			console.log({playerCred})
			
		} catch (e) {
			setErrorMsg('There was an issue with the Game ID.  Please try again')
		}
	},[findMatch, lobbyClient])

	const newGame = useCallback(async () =>{
		setErrorMsg('')
		try{
			const { matchID } = await lobbyClient.createMatch('word-jelly', {
				numPlayers: 6
			})
			setMatchID(matchID)
			setLobbyState('newGame')
		}catch (e) {
			setErrorMsg('There was an issue with creating a new game. Please try again')
		}

	},[lobbyClient])


	const displayMatch = useMemo(() =>{

		const startGame = () => {
			console.log('game started!')
			setRoute('play')
			setPlayerID(playerCred.playerID)
			setCredentials(playerCred.playerCredentials)
			setClientMatchID(matchID)
		}
		if (match && match.players) {
			const isMatchFull = () => {
				if(match && match.players){
					return !match.players.some(x => x.name === undefined);
				}
				return false
			}
			
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
					{isMatchFull() && <button id = 'btnCreate'onClick={startGame}>Start Game</button> }
				</div>
			)
		} else {
			return (
				<div>
					Finding match...
				</div>
			)
		}
	},[match, matchID, playerCred, setClientMatchID, setPlayerID, setRoute, setCredentials]) 

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