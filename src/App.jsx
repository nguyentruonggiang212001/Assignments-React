import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { datas } from "./data";
import React from "react";
import ProductList from "./ProductList";


function App() {
  return (
    <>
      <div className="App" style={{ padding: "20px" }}>
      <ProductList />
    </div>
    </>
  )
}

export default App
