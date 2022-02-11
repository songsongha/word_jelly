import React from 'react';
import CardFaceUp from '../Cards/CardFaceUp';
import CardFaceDown from '../Cards/CardFaceDown';
import ClueToken from '../ClueToken/ClueToken';

const Board = ({ ctx, G, moves, playerID, isActive }) => {
    const submitForm = () => {
		const name = document.getElementById('txtName').value
		const word = document.getElementById('txtWord').value

		moves.InputWords(G, name, word, playerID)
        // const player = {
        //     name: document.getElementById('txtName').value,
        //     playerId: document.getElementById('txtNum').value
        // }  
        // console.log({player})
        // setPlayer(player)
        // setWord(document.getElementById('txtWord').value)
        // setRoute('play')
      }
if (ctx.phase === 'inputWords') {
	return ( 
		<div className='tc'>
			Name: <input type = 'text' id = 'txtName'/>
            Word: <input type = 'text' id = 'txtWord'/>
            <button id = 'btnSubmit'onClick={submitForm}>Submit</button>
		</div>
		)
} else {

	return ( 
		<div className = 'tc pa4'>
			<div> 
	          	<CardFaceUp letter={G.letter}/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<CardFaceUp/>
	          	<br/>
	        	<br/>
	        </div>
	        <div className = 'pa5'>
	        	<ClueToken color ={'red'} number = {'1'} />
	        	<ClueToken color ={'red'} number = {'2'} /><br/>
	        	<ClueToken color ={'red'} number= {'3'}/>
	        	<ClueToken color = {'green'}/>
	        	<ClueToken color = {'red'} number= {'4'}/><br/>
	        	<ClueToken color = {'red'} number= {'5'}/>
	        	<ClueToken color = {'red'} number= {'6'}/><br/><br/>
	        	<ClueToken color = {'green'}/>
	        	<ClueToken color = {'green'}/>
	        	<ClueToken color = {'gray'}/>
	        	<ClueToken color = {'gray'}/><br/>
	        	<button>Give Clue</button>
	        </div>
	        <div>
	        	<CardFaceDown/><br/>
	        	<button>Next Card</button>
	        </div>

        </div> 
		)
	}
}
export default Board