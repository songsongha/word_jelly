import React from 'react';

const NewGame = ({setRoute}) => {

	return ( 
		<div className='tc'>
			Number of Players: <input type = 'text' id = 'txtNoOfPlayers'/>
            Word Length: <input type = 'text' id = 'txtWordLength' />
            <button id = 'btnSubmit'onClick={() => setRoute('setup')}>Submit</button>
		</div>
		)
}
export default NewGame