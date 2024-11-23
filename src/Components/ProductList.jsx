import React from "react";
import '../index.css'
import { datas } from "../data"; 

function Product(props) {
  function formVND(price){
  return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  }
  return (
    <div className="product">
      <img
        src={props.product.image}
        alt={props.product.name}
        className="product-image"
      />
      <h2 className="product-name">Name:{props.product.name}</h2>
      <p className="product-description"><strong>Description:</strong>{props.product.short_description}</p>
      <div className="product-detail">
        <span>Price:</span> {formVND(props.product.final_price)} 
      </div>
      <div className="product-detail">
        <span>SKU:</span> {props.product.sku}
      </div>
      <div className="product-detail">
        <span>Stock:</span> {props.product.stock}
      </div>
      <div className="product-detail">
        <span>Materials:</span> {props.product.materials}
      </div>
      <div className="product-detail">
        <span>Instructions:</span> {props.product.instruction}
      </div>
    </div>
  );
}


const ProductList = () => {
  return (
    <>
    <h1 style={{ marginTop: "100px" }}>Danh sách sản phẩm</h1>
    <div className="productlist">
      {datas.map((item) => (
        <Product key={item.sku} product={item} />
      ))}
    </div>
    </>
  );
};

export default ProductList;
