import { useNavigate } from "react-router-dom"

export function Secure(){
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }
    return <>
    <h1>Secure info</h1>
    <button onClick={logout}>Logout</button>
    </>
}