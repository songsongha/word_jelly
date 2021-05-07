import React from 'react';
import CardFaceUp from '../Cards/CardFaceUp';
import CardFaceDown from '../Cards/CardFaceDown';
import ClueToken from '../ClueToken/ClueToken';

const GamePlay = () => {
	return ( 
		<div className = 'tc pa4'>
			<div> 
	          	<CardFaceUp/>
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
export default GamePlay