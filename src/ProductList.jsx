import React from "react";
import './App.css'
import { datas } from "./data"; 

function Product(props) {
  return (
    <div className="product">
      <img
        src={props.product.image}
        alt={props.product.name}
        className="product-image"
      />
      <h2 className="product-name">{props.product.name}</h2>
      <p className="product-description">{props.product.short_description}</p>
      <div className="product-detail">
        <span>Price:</span> {props.product.final_price} VNĐ
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
    <h1>Danh sách sản phẩm</h1>
    <div className="productlist">
      {datas.map((item) => (
        <Product key={item.sku} product={item} />
      ))}
    </div>
    </>
  );
};

export default ProductList;
