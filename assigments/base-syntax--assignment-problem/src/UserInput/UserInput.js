import React from 'react'
import './UserInput.css'

const user = props => {
    return (
        <div className='User'>
            Enter Username: <input value={props.name} onChange={props.change} />
        </div>
    );
};

export default user;