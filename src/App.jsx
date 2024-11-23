import './App.css';
import { datas } from "./data";
import React, { useState } from "react";
import ProductList from "./Components/ProductList";
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  const [toggleProductsList, setProductListVisible] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [theme, setTheme] = useState('light');

  const handletoggleProductList = () => {
    setProductListVisible((toggleProductsList) => !toggleProductsList);
  };

  const handleSeemore = () => {
    setVisibleProducts((visibleProducts) => visibleProducts + 10);
  };

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <>
      <div className={theme}> 
        <Header toggleDarkLight={toggleTheme} theme={theme} />
        <button onClick={handletoggleProductList} >
          {toggleProductsList ? "Ẩn danh sách sản phẩm" : "Hiện thị danh sách sản phẩm"}
        </button>
        {toggleProductsList && (
          <>
            <ProductList visibleProducts={visibleProducts} />
            {visibleProducts < datas.length && (
              <button onClick={handleSeemore} style={{ margin: "10px" }}>
                See More
              </button>
            )}
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
