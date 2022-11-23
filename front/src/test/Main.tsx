import React from 'react'
import App from 'App'
import Test from '../components/screens/Test'
import { Route, Routes } from 'react-router-dom';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/companyname" element={<Test />} />
    </Routes>
  )
}

export default Main