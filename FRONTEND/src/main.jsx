import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context=createContext({Authorized:false});

const AppWrapper=()=>{
  const [Authorized,setAuthorization]=useState(false);
  const [user,setUser]=useState({});

  return(
    <Context.Provider value={{Authorized,setAuthorization,user,setUser}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
