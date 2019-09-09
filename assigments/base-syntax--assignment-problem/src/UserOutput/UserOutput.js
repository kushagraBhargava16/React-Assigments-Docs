import React from 'react'
import './UserOutput.css'

const userOutput = props => {
    return (
        <div className='UserOutput'>
            <p>UserName: {props.name}</p>
            <p>Some random text</p>
        </div>
    );
}

export default userOutput;