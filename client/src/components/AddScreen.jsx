import React, {useState} from 'react';


function AddScreen(prop) {

  
    function addTask() {
     
        prop.addTask(prop.id, null, task)
        
    }

    const [task, setTask] = useState({
        title: "",
        date: ""
      });
    
      function handleChange(event) {
          
        const { name, value } = event.target;
        
        setTask(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }
      
    return(
    <div className='overlay'>
    <div className='popup'>
    <button className="close" onClick={prop.toggleAdd}>&times;</button>
        <h1>
            Add Task
        </h1>

        <input type="text" placeholder='Task' onChange={handleChange} value={task.title} name='title'>

        </input>
        <input type="text" placeholder='Due Date...format ex: Dec 02' onChange={handleChange} value={task.date} name='date'>

        </input>
        <button style={{width: '30%', border:'none', backgroundColor:'#f1c40f', height: '30px', borderRadius:'2px'}} onClick={addTask}>Add</button>
    </div>
    </div>
    )
}

export default AddScreen