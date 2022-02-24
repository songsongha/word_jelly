import React from 'react'
import './modal.css'

const Modal = props => {
    if (!props.show){
        return null
    }
    return (
        <div className='modal'>
            <div className='modal-content'>
                <header className='modal-header'>
                    <h4 className='modal-title'>Modal Title</h4>
                </header>
                <main className='modal-body'>
                    This is the body
                </main>
                <footer className='modal-footer'>
                    <button className='button' onClick={props.onClose}>Close</button>
                </footer>
            </div>
        </div>
    )
}
export default Modal