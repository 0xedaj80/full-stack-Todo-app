import { Signin } from "./Components/Signin"
import { Signup } from "./Components/Signup"
import { BrowserRouter as Router , Route, Routes, useNavigate} from "react-router-dom"
import { TodoList } from "./Components/Todolist"
import { useEffect, useState } from "react"
import { RecoilRoot, useSetRecoilState } from "recoil"
import { authState } from "./store/authState"
function App() {
  return (
    <RecoilRoot>
    <Router>
      <Initapp />
      <Routes>
     <Route path="/login" element={<Signin></Signin>}></Route> 
     <Route path="/signup" element={<Signup></Signup>}></Route> 
     <Route path="/todos" element={<TodoList></TodoList>}></Route> 
     <Route path="/" element={<Signin></Signin>}></Route> 
    </Routes>
  </Router>
  </RecoilRoot>
  )
}

function Initapp(){
  const navigate = useNavigate() 
  // const [authen , setauthen] = useState('')
  const setauthen = useSetRecoilState(authState)
   
  const init = async ()=>{
    const token = localStorage.getItem("token")
    try{
    const response = await fetch("http://localhost:3000/auth/me",{
      headers: { Authorization: `Bearer ${token}` } 
    }) 
    const data = await response.json();
    console.log(data)
    if(data.username){
       setauthen({token:data.token, username:data.username});
       navigate("/todos") 
    }else{
       navigate("/login")
    }
    }catch(e){ 
       navigate("/login")
    } 
 
  } 

  useEffect(()=>{
     init()
  }, [])

  return( 
    <div></div>
  )
}

export default App
