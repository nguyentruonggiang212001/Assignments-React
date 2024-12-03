import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { deleteById, fetchProducts } from "../services";

const ProductsTable = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
      (async () => {
        const data = await fetchProducts("/products")
        setDataList(data)
      })()
  }, []);

  async function handleRemove(id) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm chứ?')) {
    const res = await deleteById('/products', id);
    console.log(res);
    if (res.status === 200) {
      const newProducts = dataList.filter(item => item.id !== id);
      setDataList(newProducts);
    } else {
      console.log("Error!");
    }
  }
 }
  return (
    <div>
      <h2 style={{marginTop:"100px"}}>Quản Lý Sản Phẩm</h2>
      <div>
       <Link to={`/admin/products/add`}><button>Add new product</button></Link>
      </div>
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
                <Link to={`/admin/products/update/${item.id}`}>
                <button style={{ background: "yellow", color: "black" }}>Update</button>
                </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;