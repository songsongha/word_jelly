import React from 'react';

const NewGame = ({setRoute, setPlayerId}) => {
    const handleSelection = (id) =>{
        setPlayerId(id)
        setRoute('play')
    }
	return ( 
		<div className='tc'>
            Number of Players: <input type = 'text' id = 'txtNumPlayers' value ={6}/>
            Word Length: <input type = 'text' id = 'txtWordLength' value = {5} />
            <br/>
            <br/>
                Play as Player:
                <button onClick={() => handleSelection('0')}>0</button>
                <button onClick={() => handleSelection('1')}>1</button>
                <button onClick={() => handleSelection('2')}>2</button>
                <button onClick={() => handleSelection('3')}>3</button>
                <button onClick={() => handleSelection('4')}>4</button>
                <button onClick={() => handleSelection('5')}>5</button>
		</div>
		)
}
export default NewGame