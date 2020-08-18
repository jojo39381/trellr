import React, {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './components/Column.jsx';
import Header from './components/Header.jsx';
import axios from 'axios';
import AddColumn from './components/AddColumn.js';

/* random image */
const imageUrl = 'https://source.unsplash.com/random/?people/';




function getRandomColor() {
   
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
/* imageurl needs uuid/number at the end to be random so browser don't cache the image */
const columnsFromServer = 
    {   [uuid()] : {
            name: 'Backlog',
            items: [{id: uuid(), content: "asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas ", assigned:imageUrl + uuid(), date: "as", color: getRandomColor(), image: ""}]
        }
    };









/* columns from the server, currently hard coded. */


/* function for when the drag ends, accounts for when dragging to other columns or to nowhere */
const dragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination } = result;
    if(source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]:  {
                ...sourceColumn, 
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn, 
                items: destItems
            }
        })
        const savedDestination = {
            tasks:destItems
        }
        const savedSource = {
            tasks:sourceItems
        }
        console.log(result.destination)
        axios.post('/exercises/update/' + result.destination.droppableId, savedDestination)
        .then(res => console.log(res.data)) 
        axios.post('/exercises/update/' + result.source.droppableId, savedSource)
        .then(res => console.log(res.data)) 

    }
    else {
    const column = columns[source.droppableId];
    const copy = [...column.items];
    const [removed] = copy.splice(source.index, 1);
    copy.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copy
      }
    });
    const savedSource = {
        tasks:copy
    }
    axios.post('/exercises/update/' + result.source.droppableId, savedSource)
        .then(res => console.log(res.data)) 
    }
   
};



function App() {

    

    
    const [columns, setColumns] = useState(columnsFromServer);
    const [toggle, setToggle] = useState(false)
    const [weather, setWeather] = useState({
        temp:"",
        weather:""
    })
    useEffect(() => {
        
        const col = {

        }
        axios.get("/exercises")
        .then(response => {
            console.log(response.data.length)
            if (response.data.length > 0) {
                 response.data.forEach((task) => {
                    col[task.id] = {
                        name : task.category,
                        items: task.tasks
                    }
                    
                     
    
                }
                )
            }

            setColumns(col)
        })

        
      },[]);
   
    useEffect(() => {
        console.log("asd")
        axios.get("/api/weather")
        .then(response => {
            console.log(response.data)
            // setWeather({
            //     weather: response.data.
            // })
        })
        






         
            
         
       
    }, [columns])

   
    
    /* add to column the new task or update it */
    function addToColumn(destination, id, task) {
    
        const column = columns[destination]
        var updated = [...column.items]
        const object = {id: uuid(), content: task.title, assigned:imageUrl + uuid(), date: task.date, color: getRandomColor(), image: task.image}
        if (id != null) {
            var index = updated.findIndex( x => x.id === id)   
            updated[index] = object
        }
        else {
           
        updated.push(object)

            
        
        }

        const serverColumn = {

            tasks:updated
        }
        axios.post('/exercises/update/' + destination, serverColumn)
        .then(res => console.log(res.data)) 
        
        

        setColumns({
            ...columns,
            [destination]: {
              ...column,
              items: updated
            }
          });

        
    }
    function deleteFromColumn(destination, id) {
        const column = columns[destination]
        var updated = [...column.items]
        var index = updated.findIndex( x => x.id === id) 
        updated.splice(index, 1)
        setColumns({
            ...columns,
            [destination]: {
              ...column,
              items: updated
            }
          });

        const serverColumn = {
            tasks: updated
        }
          axios.post('/exercises/update/' + destination, serverColumn)
        .then(res => console.log(res.data)) 
    }

    function addColumn(name){
        
        const data = {
            id: uuid(),
            category: name,
            tasks:[]
        }
        
        axios.post("/exercises/add", data)
        .then(res => console.log(res.data))
        setColumns({
            ...columns,
            [uuid()]: {
              name: name,
              items: []
            }
          });
        setToggle(false)
    }


    function deleteColumn(destination) {

    }

    function toggleAdd() {
        setToggle(!toggle)
    }
    
    return (
        
        <div>
        <Header>
            
        </Header>
        <button onClick={toggleAdd} style={{width:"100px", height:"50px", margin:"20px", float:"left"}}>Add</button>
        <h1  style={{width:"150px", height:"50px", margin:"20px", float:"right"}}>{weather.temp} &deg;F <br></br> {weather.weather}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%'}}>
            <DragDropContext onDragEnd={result => dragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        
                        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}} key={uuid()}>
                        <h2>{column.name}</h2>
                        <div style ={{margin: 8}}>
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                                return (
                                    <Column key={id} provided={provided} snapshot={snapshot} column={column} addToColumn={addToColumn} id={id} editTask={addToColumn} deleteTask={deleteFromColumn}/>
                                )
                            }}
                        </Droppable>
                    </div>
                    </div>
                    )
                })}
            </DragDropContext>
        </div>
        
            {toggle ? <AddColumn addColumn={addColumn} toggleAdd={toggleAdd}></AddColumn> : null}
        </div>
    )
}

export default App