import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleData } from "../../lib/api";

export function Secure() {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const logout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    };

    useEffect(() => {
        handleData()
            .then(response => {
               setData(response)
            })
            .catch(err => {
                console.error(err.message)
                logout()
            })
    }, [])

    return (
        <>
            <h1>Secure info</h1>
            {
                data.map((username, index) => <div key={index}>
                    <strong>{username}</strong> </div>)
            }
            <button onClick={logout}>Logout</button>
        </>
    );
}
