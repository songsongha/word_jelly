import React from 'react';
import CardFaceDown from '../Cards/CardFaceDown';
import TokensTaken from '../TokenTracker/TokensTaken';


const MyCards = ({G, playerID, setOpenModal, moves}) => {
    const nextCard = () => {
		moves.nextCard(playerID)
	}

	const bonusLetter = () => {
		if (G.players[playerID].letterPosition === G.words[playerID].length-1){
			moves.nextCard(playerID)
		} else {
			setOpenModal(true)
		}
	}

    

return (
    <div className= 'myCards'>
       <CardFaceDown G={G} playerID={playerID}/>
					<TokensTaken G={G} playerID={playerID}/>
					<br/>
					{ G.isNextCardAvailable[playerID] && !G.isClueInProgress && 
						<div>
							{G.players[playerID].letterPosition >= G.words[playerID].length-1 ?
							<button id = 'bonusCard' onClick = {bonusLetter}>
								{G.players[playerID].letterPosition === G.words[playerID].length-1 ? 'I know all my letters': 'I know this letter'}
							</button>
							:
							<button id = 'nextCard' onClick = {nextCard}>
								Next Card
							</button> 
							}
						</div> 
					}
    </div>
    )
}
export default MyCards