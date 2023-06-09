import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css";
import {Landing, Dashboard, Register, Error} from "./pages/"
 





const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/landing" element = {<Landing/>}/>
        <Route path="*" element = {<Error/>}/>
      
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App