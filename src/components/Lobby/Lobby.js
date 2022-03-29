import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { LobbyClient } from 'boardgame.io/client'
import { useNavigate } from 'react-router-dom'

const Lobby = ({numPlayers, lobbyClient, setNumPlayers, setLobbyClient}) => {
	const [matchID, setMatchID] = useState('')
	const [lobbyState, setLobbyState] = useState('lobby')
	const [errorMsg, setErrorMsg] = useState('')
	const [wordLength, setWordLength] = useState('5')

	let navigate = useNavigate()
	
	useEffect(() => {
		const lobbyClient =  new LobbyClient({ server: 'http://localhost:8000' })
		setLobbyClient(lobbyClient)
	},[setLobbyClient])
		

	const newGame = useCallback(async (numPlayers, wordLength) =>{
		console.log({wordLength})
			setErrorMsg('')
			try{
				const { matchID } = await lobbyClient.createMatch('word-jelly', {
					numPlayers: Number(numPlayers)
				})
				setMatchID(matchID)
				setLobbyState('newGame')
			}catch (e) {
				console.log({e})
				setErrorMsg('There was an issue with creating a new game. Please try again')
			}

	},[lobbyClient])

	return ( 
		<div className='tc'>
			<div className='pb3 dark-red'>
			{errorMsg}
			</div>
			{lobbyState === 'lobby' &&
			<div>
				<label htmlFor='numPlayers'>Number of Players:</label>
					<select name='numPlayers' id='numPlayers' onChange={(e => {setNumPlayers(e.target.value)})}>
						<option value='6'>6</option>
					</select>
				<label htmlFor='wordLength'>Length of Word:</label>
					<select name='wordLength' id='wordLength'onChange={(e => {setWordLength(e.target.value)})}>
						<option value='5'>5 Letters (Normal)</option>
						<option value='3'>3 Letters (Easy) </option>
						<option value='7'>7 Letters (Hard)</option>
						<option value='open'>Any length (Open)</option>
					</select><br/>
				<button id = 'btnCreate'onClick={() => newGame(numPlayers, wordLength)}>New Game</button>
			</div>
			}
			{ lobbyState === 'newGame' &&
				<div>
					Send your friends this URL: <br/>
					http://localhost:3000/play/{wordLength}/{matchID} <br/>
					<br/>
					{/* Your Name:<input type = 'text' id = 'txtName' onChange={(e) => {setPlayerName(e.target.value)}}/> */}
					<button id = 'btnJoin' onClick={() => navigate(`/play/${wordLength}/${matchID}`)}>Join Game</button>
				</div>}
		</div>
		)
}
export default Lobby