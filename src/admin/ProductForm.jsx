import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { createNew, getById, updateById, } from "../services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaProduct } from "../schemas/productShema";


const ProductForm = () => {
  const { id } = useParams();
  const nav = useNavigate(); 
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schemaProduct),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getById("/products", id);
        reset(data);
      })();
    }
  }, [id, reset]);

  const handleAddProduct = async (product) => {
    console.log(product);
    let confirmMessage = "";
    if (id) {
      // logic update
      confirmMessage = "Bạn có chắc chắn muốn cập nhật sản phẩm này?";
      const data = await updateById("/products", id, product);
      console.log(data);
    } else {
      // logic add
      confirmMessage = "Bạn có chắc chắn muốn thêm mới sản phẩm này?";
      const data = await createNew("/products", product);
      console.log(data);
    }
    if (confirm(confirmMessage)) {
      nav("/admin/products");
    } else {
      reset(); 
    }
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn reset các trường?")) {
      reset();
    }
  };

  return (
    <div className="form-update">
      <h1 className="header-update">{id ? "Cập nhật" : "Thêm mới"} sản phẩm</h1>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p style={{color:"red"}}>{errors.title?.message}</p>}

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price && <p style={{color:"red"}}>{errors.price?.message}</p>}

        <label>Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          {...register("description", { required: true })}
          rows="10"
        ></textarea>

        <div className="button-group">
          <button style={{ backgroundColor: "green" }} onClick={handleSubmit}>
            {id ? "Update" : "Add"}
          </button>{" "}
          <button
            style={{ backgroundColor: "gray" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;