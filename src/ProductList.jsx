import React from "react";

const ProductList = ({ products }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product) => (
        <div
          key={product.sku}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "250px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <h2 style={{ fontSize: "18px" }}>{product.name}</h2>
          <p>{product.short_description}</p>
          <p>
            <strong>Price:</strong> {product.final_price.toLocaleString()} VND
          </p>
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Materials:</strong> {product.materials}
          </p>
          <p>
            <strong>Instructions:</strong> {product.instruction}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;