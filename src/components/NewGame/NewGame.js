import React from 'react';

const NewGame = ({setRoute, setNumPlayer, setWordLength}) => {

	return ( 
		<div className='tc'>
			Number of Players: <input type = 'text' id = 'txtNumPlayers' onChange = {event => setNumPlayer(event.target.value)}/>
            Word Length: <input type = 'text' id = 'txtWordLength' onChange = {event => setWordLength(event.target.value)} />
            <button id = 'btnSubmit'onClick={() => setRoute('setup')}>Submit</button>
		</div>
		)
}
export default NewGame