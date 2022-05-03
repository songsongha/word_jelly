import React, { useCallback, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ReactGA from 'react-ga'

const Lobby = ({numPlayers, lobbyClient, setNumPlayers, setShowRules}) => {
	const [matchID, setMatchID] = useState('')
	const [lobbyState, setLobbyState] = useState('lobby')
	const [errorMsg, setErrorMsg] = useState('')
	const [wordLength, setWordLength] = useState('5')

		let playerChoice = []
		for (let i = 2; i<=6; i++){
			playerChoice.push(
  				<option key={`playerChoice${i}`} value={i} >{i}</option>
			)
		}

	let navigate = useNavigate()
	useEffect(() => {
		setShowRules(true)
	}, [setShowRules])
		
	const createGame = useCallback(async (numPlayers) =>{
			setErrorMsg('')
			try{
				const { matchID } = await lobbyClient.createMatch(`word-jelly${numPlayers}`, {
					numPlayers: Number(numPlayers)
				})

				ReactGA.event({
					category: 'Game',
					action: 'Created Game',
					label: `${numPlayers}-Players`
				  })

				setMatchID(matchID)
				setLobbyState('createGame')
			}catch (e) {
				console.log({e})
				setErrorMsg('There was an issue with creating a new game. Please try again')
			}
		
	},[lobbyClient])

	return ( 
		
		<div className='pa4 black-80 measure center'>
			
			<div className='pb3 dark-red'>
			{errorMsg}
			</div>
			{lobbyState === 'lobby' &&
			<div>
				<legend className='f4 fw6 ph0 mh0'>
				New Game
				</legend>
				<div className='mt3'>
				<p className='ph8'> 
				Word Jelly is a collaborative word game where players give each other clues to figure out 
				their letters. Unscramble your letters to spell your word.
				</p>
				<label htmlFor='numPlayers'className='db fw6 lh-copy f6'>Number of Players:</label>
				<div className='pl3'>
				<select name='numPlayers' value={numPlayers} onChange={(e => {setNumPlayers(e.target.value)})}>
					{playerChoice}
				</select>
				</div>
					<label htmlFor='wordLength'className='db fw6 lh-copy f6'>Length of Word:</label>
				<div>
					<label><input className='ml3 mr2' type='radio' name='wordLength' value='3' onChange={(e => {setWordLength(e.target.value)})}/>3 Letters (Easy)</label> 
				</div>
				<div>
					<label><input className='ml3 mr2' type='radio' name='wordLength' value='5' checked onChange={(e => {setWordLength(e.target.value)})}/>5 Letters (Normal)</label> 
				</div>
				<div>
					<label><input className='ml3 mr2' type='radio' name='wordLength' value='7' onChange={(e => {setWordLength(e.target.value)})}/>7 Letters (Hard)</label> 
				</div>
				<div>
					<label><input className='ml3 mr2' type='radio' name='wordLength' value='open' onChange={(e => {setWordLength(e.target.value)})}/>Open</label> 
				</div>
				<button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
				id = 'btnCreate'
				onClick={() => createGame(numPlayers)}>
					Create Game
				</button>
			</div>
			</div>
			}
			{ lobbyState === 'createGame' &&
				<div>
					<legend className='f4 fw6 ph0 mh0'>
					Send your friends this URL:
					</legend>
					<p className='mt3 ph8'>
					
					https://word-jelly.herokuapp.com/play/{wordLength}/{matchID} <br/>
					<br/>
					</p>
					<button 
					className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
					id = 'btnJoin' 
					onClick={() => navigate(`/play/${wordLength}/${matchID}`)}>Got It</button>
				</div>}
		</div>
		)
}
export default Lobby


