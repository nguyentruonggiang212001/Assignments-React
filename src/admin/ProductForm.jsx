import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { create, updateById, getById } from "../axios";

const ProductForm = () => {
  const { id } = useParams();
  console.log("id: ", id);
  const nav = useNavigate();

   const resetForm = {
    title: "",
    price: 0,
    description: "",
  };


   const [product, setProduct] = useState(resetForm);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
        const data = await getById("/products", id);
          setProduct({
          title: data.title,
          price: data.price,
          description: data.description ,
          });
        } catch (error) {
          console.error("Không tìm thấy sản phẩm: ", error);
        }
      })();
    }
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (id) {
  const res = await updateById("/products", id, product);
  console.log(res);
  if (res.status === 201) {
    alert("Cập nhật sản phẩm thành công!");
    }
  } else {
    const res = await create("/products", product);
    console.log(res);
    if (res.status === 204) {
    alert("Thêm mới sản phẩm thành công!");
    }
  }
  nav("/admin/products");
  };
  
   function handleResetForm () {
    if (confirm("Bạn có chắc chắn muốn reset không?")) {
      setProduct(resetForm);
    }
  };

  return (
    <div className="form-update">
      <h1 className="header-update">{id ? "Cập nhật" : "Thêm mới"} sản phẩm</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={product.title}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="10"
        ></textarea>
        <div className="button-group">
          <button style={{backgroundColor:"green"}}  onClick={handleSubmit}>
          {id ? "Update" : "Add"}
        </button>
         <button style={{backgroundColor:"gray"}} onClick={handleResetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

