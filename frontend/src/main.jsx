import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup/page.jsx'
import { Login } from './pages/Login/page.jsx'
import { Secure } from './pages/Secure/page.jsx'

const routes = createBrowserRouter([
  {
    path:"",
    element:<Signup/>
    
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"secure",
    element:<Secure/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider  router={routes}>
     </RouterProvider>
  </StrictMode>,
)
