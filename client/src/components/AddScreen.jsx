import React, {useState, useEffect} from 'react';


function AddScreen(prop) {
  
  const [task, setTask] = useState({
    title: "",
    date: "",
    image: ""
  });

 const [image,setImage] = useState("")


 const [url,setUrl] = useState("")
  useEffect(() => {
  
    if (url) {
      
      setTask({
        ...task,
        image: url
      }, function() {
        console.log("success")
        prop.addTask(prop.id, null, task)
      })
      console.log(task)
      
    }
  }, [url])

    
 
    function uploadImage() {
     
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","instaclone")
      data.append("cloud_name","jojo39381")
      fetch("https://api.cloudinary.com/v1_1/jojo39381/image/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json())
      .then(data=>{
         setUrl(data.url)
      })
      .catch(err=>{
          console.log(err)
      })

        
        
    }

    
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
        <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            
            </div>

        <button style={{width: '30%', border:'none', backgroundColor:'#f1c40f', height: '30px', borderRadius:'2px'}} onClick={uploadImage}>Add</button>
    </div>
    </div>
    )
}

export default AddScreen