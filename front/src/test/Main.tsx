import React from 'react'
import App from 'App'
import Detail from '../components/screens/Detail'
import { Route, Routes } from 'react-router-dom';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/companyname/:name" element={<Detail />} />
    </Routes>
  )
}

export default Main