import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handlelogin = async() =>{
     const response = await fetch("http://localhost:3000/auth/signup",{
            method:"POST",
            body:JSON.stringify({username, password}),
            headers:{ 'Content-Type': 'application/json' },

         })
      
    const data = await response.json();
    if(data.token){
         localStorage.setItem("token", data.token)
    // navigate("/todos")
    window.location = "/todos"
        }else{
         alert("invalid credentials")
    }  

    }
return ( 
    <div style={{display:"flex", justifyContent:"center", marginTop:70}} >
        <div style={{border:"2px solid black", padding:10,}}>
            <div style={{display:"flex", justifyContent:"center"}}> 
        <h2>Signup</h2>
        </div> 
            <div style={{padding:10}}>
    <input type="text" placeholder="username" size={30} onChange={(e)=>{ setUsername(e.target.value)}}/>
    </div>
    <div style={{padding:10}}>
    <input type="text" placeholder="password"  size={30} onChange={(e)=>{setPassword(e.target.value)}}/> 
    </div>
    <div style={{display:"flex", justifyContent:"center"}}>    
    already a member? <Link to="/login">Login</Link> 
    </div>
    <div style={{display:"flex", justifyContent:"center" ,padding:10,}}> 
    <button onClick={handlelogin}>Signup</button>
   </div>
    </div>
    </div> 
    )
    
}