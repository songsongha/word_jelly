import React from 'react'
import './modal.css'

const GainToken = ({show, G, moves}) => {
    
    if (!show){
        return null
    }
    
    
    const handleSubmit = () => {
        moves.resetGainToken(G)
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Gained a Clue Token!</h4>
                </header>
                <main className='modal-body'>
                        A non-player stand reached the end of its hand so the team gained another clue token that can be used by anyone.
                </main>
                <footer className='modal-footer'>
                    <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' onClick={handleSubmit}>Yay!</button>
                </footer>
            </div>
        </div>
    )
}
export default GainToken