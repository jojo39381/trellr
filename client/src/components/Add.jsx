import React from 'react';
/* the big add button that prompts the add task screen */
function Add(prop) {
    return (
        <div className='note' 
        style={{padding: 16,
            margin: '0 0 8px 0',
            minHeight: '30px', display:'flex', alignItems:'center', justifyContent:'center'}}>

            <button style={{fontSize:'25px', border:'none', backgroundColor: 'white', width: '100%', height: '100%'}} onClick={prop.toggleAdd} >+</button>
        </div>
    )
}

export default Add