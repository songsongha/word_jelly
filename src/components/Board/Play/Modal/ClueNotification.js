import React from 'react'
import './modal.css'

const ClueNotification = ({show, G}) => {

    if (!show){
        return null
    }
   
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Waiting...</h4>
                </header>
                <main className='modal-body'>
                        {`${G.players[G.clueGiver].name} is currently giving a clue`}
                </main>
                <footer className='modal-footer'>
                </footer>
            </div>
        </div>
    )
}
export default ClueNotification