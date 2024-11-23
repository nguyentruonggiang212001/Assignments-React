import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { datas } from "./data";
import React from "react";
import ProductList from "./Components/ProductList";
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {
  return (
    <>
      <Header></Header>
      <ProductList />
      <Footer></Footer>
    </>
  )
}

export default App
