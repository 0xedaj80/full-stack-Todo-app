import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";

export function Signin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const authenstate = useRecoilValue(authState)
   
    const handlelogin = async() =>{
     const response = await fetch("http://localhost:3000/auth/login",{
            method:"POST",
            body:JSON.stringify({username, password}),
            headers:{ 'Content-Type': 'application/json' },

         })
      
    const data = await response.json();
    if(data.token){
       localStorage.setItem("token", data.token)
    //    navigate("/todos")
    window.location = "/todos"
    }else{
         alert("wrong username or password")
    }

    }

    return ( 
    <div style={{display:"flex", justifyContent:"center", marginTop:70}} >

        <div style={{border:"2px solid black", padding:10,}}>
        <div style={{display:"flex", justifyContent:"center"}}> 
        <h2>Login</h2>
        </div> 
    <div style={{padding:10}}>
    <input type="text" placeholder="username" size={30} onChange={(e)=>{ setUsername(e.target.value)}}/>
    </div>
    <div style={{padding:10}}>
    <input type="text" placeholder="password"  size={30} onChange={(e)=>{setPassword(e.target.value)}}/> 
    </div>
    <div style={{display:"flex", justifyContent:"center"}}>    
    New here? <Link to="/signup">Signup</Link> 
    </div>
    <div style={{display:"flex", justifyContent:"center" ,padding:10,}}> 
    <button onClick={handlelogin}>Login</button>
   </div>
    </div>
    </div> 
    )
}