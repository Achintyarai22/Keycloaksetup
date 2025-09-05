import React, { useEffect } from "react";
import "./style.css";
import axios from "axios";


const Todo=()=>{
     const [task, setTask] = React.useState();
   
     useEffect(()=>{
          axios.get("http://localhost:5000/getall").then((res)=>{
            console.log(res.data)
        setTask(res.data.todos)
     })
     .catch((err)=>{
        console.log(err)
     })
     },[])
    return (
        <div className="main-container">

            <div className="todo-container"
            style={{border:"1px solid black", padding:"20px", borderRadius:"10px"}}
            >
                <h1>Todo List</h1>
                <input type="text" placeholder="Add a new task" />
                <button>Add Task</button>
               {
                task &&
                (
                task.map((el)=>{
                    return(
                        <>
                        <li key={el.id} style={{listStyleType:"none", marginTop:"10px"}}>
                            <h3>{el.titele}</h3>
                            <p>{el.desc}</p>
                            <button>Delete</button>
                        </li>
                        <hr />
                        </>
                    )
                })
            )
               }
            </div>

        </div>)
}

export default Todo