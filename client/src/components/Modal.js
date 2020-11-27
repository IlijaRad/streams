import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div 
            onClick={props.onDismiss} 
            style={{
                backgroundColor: 'black',
                zIndex: 10,
                height: '100vh',
                width: '100vw',
                top: '0',
                left: '0',
                position: 'fixed',
                textAlign: 'center',
                opacity: 0.9
            }}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    border: '3px solid black',
                    margin: '20vh auto',
                    width: '30vw',
                    height: '200px',
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >
                <h3>{props.title}</h3>
                <div>{props.content}</div>
                {props.actions}
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;