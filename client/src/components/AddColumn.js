import React, {useState} from "react"





function AddColumn(prop) {

    const [name, setName] = useState({
        name: "",
        description: ""
      });
    
      function handleChange(event) {
          
        const { name, value } = event.target;
        
        setName(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }

      function addToProp() {
          prop.addColumn(name.name)
      }

    
    return (
        <div className='overlay'>
    <div className='popup'>
    <button className="close" onClick={prop.toggleAdd}>&times;</button>
        <h1>
            Add Column
        </h1>

        <input type="text" placeholder='Task' onChange={handleChange} value={name.name} name='name'>

        </input>
        <input type="text" placeholder='Due Date...format ex: Dec 02' onChange={handleChange} value={name.description} name='description'>

        </input>
        <button style={{width: '30%', border:'none', backgroundColor:'#f1c40f', height: '30px', borderRadius:'2px'}} onClick={addToProp}>Add</button>
    </div>
    </div>
    )
}

export default AddColumn