import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  removeProduct,
} from "../../features/products/productAction";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure delete")) {
      dispatch(removeProduct(id));
    }
  };

  if (!isAdmin) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "205px",
          color: "red",
          fontSize: "20px",
        }}
      >
        Bạn không có quyền truy cập trang này!
      </h2>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <h1
        style={{
          marginTop: "200px",
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        Products List
      </h1>
      <Link to={`/admin/products/add`}>
        <button className="btn btn-primary">Add Product</button>
      </Link>
      <table className="product-table">
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
          {products.length ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td style={{ display: "flex" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-warning"
                    to={`/admin/products/update/${item.id}`}
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Product Empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
