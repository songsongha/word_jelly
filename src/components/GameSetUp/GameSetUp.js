import React from 'react'

const GameSetUp = ({setRoute, wordLength, setWord, setPlayer}) => {
    const guid=()=> {
        const s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);     
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
      }

    const submitForm = () => {
        const player = {
            name: document.getElementById('txtName').value,
            playerId: document.getElementById('txtNum').value
        }  
        console.log({player})
        setPlayer(player)
        setWord(document.getElementById('txtWord').value)
        setRoute('play')
      }

	return ( 
		<div className='tc'>
            Player Num: <input type = 'text' id = 'txtNum' />
			Name: <input type = 'text' id = 'txtName'/>
            Word: <input type = 'text' id = 'txtWord'/>
            <button id = 'btnSubmit'onClick={submitForm}>Submit</button>
		</div>
		)
}
export default GameSetUp