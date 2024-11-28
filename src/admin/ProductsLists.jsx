import React, { useState, useEffect } from "react";
import "../index.css";
import { NavLink } from "react-router-dom";

const ProductsList = () => {
  const [dataList, setDataList] = useState([]);
  const [stateData,setStateData] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Chi tiết sản phẩm: ", data);
        setDataList(data);
      });
  }, [stateData]);

  async function handleRemove(id) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm chứ?')) {
      try {
        await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
      });
       setStateData(!stateData)
      } catch (error) {
        console.error('Lỗi ko xóa được sản phẩm:', error);
      }
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}$</td>
              <td>{item.description}</td>
              <td>
                <div className="action-buttons">
                <button style={{ background: "red" }} onClick={() => handleRemove(item.id)}>Remove</button>
                <NavLink to={"/admin/products/update"}>
                <button style={{ background: "yellow", color: "black" }}>Update</button>
                </NavLink>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
