import axios from "axios";


const Axios = axios.create({
    baseURL: 'http://localhost:3001',
    
    withCredentials: true
});

export const handleSignup = async ({username, password}) => {
    const response = await Axios.post("/register", {username, password},{
        headers: {
            "Content-Type": "application/json",
        }
        })
    return response.data
}

export const hangleLogin = async ({username, password}) => {
    const response = await Axios.post("/login", {username, password},{
        headers: {
            "Content-Type": "application/json",
        }
        })
    return response.data
}

export const handleLogout = async ({username}) => {
    const response = await Axios.post("/logout", {username},{
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.data
}