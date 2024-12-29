import { useState } from "react"
import {  hangleLogin } from "../../lib/api"
import { useNavigate } from "react-router-dom"

export  function Login(){
    const [user, setUser] = useState({
        username:"",
        password:""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = user
        if(!username || !password){
            setError("Please fill username and password")
        }
        
        hangleLogin({ username, password })
        .then(response => {
            if (response.token) {
                localStorage.setItem("authToken", response.token)
                setError("")
                navigate("/secure")
            } else {
                setError(response.message || "Login failed")
            }
        })
        .catch(err => {
            console.error(err)
            setError("An error occurred")
        })
        
      
    }
    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input type="text" 
              placeholder="enter username"
              value={user.username}
              onChange={e => setUser({...user, username:e.target.value})}/>

            <input type="password" 
             placeholder="enter password"
             value={user.password}
             onChange={e => setUser({...user, password:e.target.value})}/>

             <button>Login</button>
        </form>
    )
}