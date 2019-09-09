import React from 'react';

const validationComponent = props => {
    return (
        <div className='ValidationComponent'>
            {
                props.length > 5
                    ? <p>Text long enough</p>
                    : <p>Text too short</p>
            }
        </div>
    );
}

export default validationComponent;