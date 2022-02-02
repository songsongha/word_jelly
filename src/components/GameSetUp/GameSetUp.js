import React from 'react';

const GameSetUp = ({setRoute}) => {

	return ( 
		<div className='tc'>
			Name: <input type = 'text' id = 'txtName'/>
            Word: <input type = 'text' id = 'txtWord' />
            <button id = 'btnSubmit'onClick={() => setRoute('play')}>Submit</button>
		</div>
		)
}
export default GameSetUp