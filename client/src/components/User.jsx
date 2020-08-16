import React from 'react';

/* user component for the small images for each user */
function User(prop) {
    return (
        <div >
        <img className='user' src={prop.img} alt=""></img>
        <span className='date'>{prop.date}</span>
        
        </div>
    )
}
export default User