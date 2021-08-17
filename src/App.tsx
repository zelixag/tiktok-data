import React, { useEffect, useState } from 'react'
import './App.css'
import ProductExcel from './components/ProductExcel/index';
import { login } from './services/userServices';

function App() {
  useEffect(() => {
    login();
  }, [])
  return (
    <div className="App">
      <ProductExcel />
    </div>
  )
}

export default App
