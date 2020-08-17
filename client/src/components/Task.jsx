import React, {useState} from 'react';
import User from './User.jsx';
import EditScreen from './EditScreen.jsx';
/* task component for the little task note cards */
function Task(prop) {

    const [clickedEdit, setEdit] = useState(false);
    function toggleEdit() {
        
        setEdit(!clickedEdit)
    }

    const imageUrl = 'https://source.unsplash.com/random/?people/';

    return (
        <div>
        <div className='note' ref={prop.provided.innerRef}
        {...prop.provided.draggableProps}
        {...prop.provided.dragHandleProps}
        style={{
           
            usereSelect: 'none',
            padding: 16,
            margin: '0 0 8px 0',
            
            backgroundColor: prop.snapshot.isDragging ? '#D5D5D5' : '#FFFFFF',
            color: 'black',
            ...prop.provided.draggableProps.style
        }} onClick={toggleEdit}>
        <div className='color-bar' style={{backgroundColor:prop.color}}></div>
            <h3 style={{backgroundColor:"red", height:"auto"}}>{prop.item.content}</h3>
            <img src={imageUrl} style={{height:"200px", width:"200px", position:"relative", display: "block",marginLeft: "auto", marginRight: "auto", backgroundSize:"cover", marginBottom:"20px"}}></img>
           
            <User img={prop.item.assigned} date={prop.item.date}></User>
            
            
        </div>
        {clickedEdit?  
            <EditScreen toggleEdit={toggleEdit} editTask={prop.editTask} id={prop.item.id} column={prop.column} deleteTask={prop.deleteTask}/>  
             : null } 
        </div>
    )
}
export default Task;
