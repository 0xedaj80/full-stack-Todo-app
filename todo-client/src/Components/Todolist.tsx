import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../store/authState";
    
interface Todo {
     _id:string;
     title:string;
     description:string;
     done:Boolean;
}
type todoArray = Todo[]
export function TodoList(){
    const [todos, setTodos] = useState<todoArray>([])
    const  [title, setTitle] = useState('');
    const [description, setDescription ] = useState(''); 
    const navigate = useNavigate()
    const authenstate = useRecoilValue(authState)
    // const setauthstate = useSetRecoilState(authState)
   
    useEffect(()=>{
         const getTodos = async ()=>{
             const response = await fetch("http://localhost:3000/todo/todos",{
                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
             }) 
             const data = await response.json()
             setTodos(data);
         }
         getTodos()
    },[authState.token])
    

    const addTodo = async ()=>{
     const response = await fetch("http://localhost:3000/todo/todos", { 
         method:"POST",
         body:JSON.stringify({title,description}),
         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
     }) 
     const data = await response.json();
     setTodos([...todos,data]);
    } 
    

    return(
        <div >
        
            <div style={{display:"flex", justifyContent:"center"}}>
                {console.log(authenstate.username)}
             <h2> welcome {authenstate.username}</h2>
             <div style={{marginTop: 25, marginLeft: 20}}>
                <button onClick={()=>{
                     localStorage.removeItem("token") 
                    window.location = "/login"
                }}>LOGOUT</button> 
             </div>
            </div>
            <div >
            <div style={{display:"flex", justifyContent:"center"}}>
            <h2>TODO LIST</h2>
            </div>
            <div style={{display:"flex" , justifyContent:"center"}}> 
            <input type="text" style={{margin:10}} placeholder="title" onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" style={{margin:10}} placeholder="description" onChange={(e)=>{setDescription(e.target.value)}}/>
            <button style={{flexGrow:0, width:'auto'}} onClick={addTodo}>add Todo</button> 
            </div>
            
            {
                todos.map((todo)=>(
                     <div key={todo._id}style={{display:"flex", justifyContent:"center" , border:"2px solid black",padding:5, width:600
                        ,margin:8, marginLeft:600
                     }}>
                        <h3 style={{margin:15}}>{todo.title}</h3>
                       <p style={{margin:16}}>{todo.description}</p>
                       <div style={{padding:5, marginTop:9}}>
                       <button>done</button>
                       </div> 
                    </div>
                ))
            }
            
        
            
        </div>
        </div>
     )
}