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
      <h1>Danh sách sản phẩm</h1>
      <ProductList products={datas} />
    </div>
    </>
  )
}

export default App
