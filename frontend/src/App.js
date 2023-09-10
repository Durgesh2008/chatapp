import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './component/Login'
import NotFound from './component/NotFound'
import Register from './component/Register'
import Chatbox from './component/Chatbox'
import Setavtar from './component/Setavtar'


const App = () => {
  ;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chatbox />} />
        <Route path="/setavtar" element={<Setavtar />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

