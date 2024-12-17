import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { schemaProduct } from "../../schemas/productShema";
import { useEffect } from "react";
import { getById } from "../../services/productServices";
import { useDispatch } from "react-redux";
import {
  createProduct,
  editProduct,
} from "./../../features/products/productAction";

const ProductForm = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schemaProduct),
  });

  const onSubmit = (dataBody) => {
    try {
      const isConfirmed = window.confirm(
        id
          ? "Bạn có chắc chắn muốn cập nhật sản phẩm không?"
          : "Bạn có chắc chắn muốn thêm sản phẩm không?"
      );
      if (!isConfirmed) {
        return;
      }
      if (id) {
        dispatch(editProduct({ id, product: dataBody }));
        nav("/");
      } else {
        dispatch(createProduct(dataBody));
        nav("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn reset các trường?")) {
      reset();
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getById(id);
        reset(data);
      })();
    }
  }, [id]);

  return (
    <div>
      <h1 className="header-update">{id ? "Cập nhật" : "Thêm mới"} sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p style={{ color: "red" }}>{errors.title?.message}</p>
        )}
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price && (
          <p style={{ color: "red" }}>{errors.price?.message}</p>
        )}

        <label>Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          {...register("description", { required: true })}
          rows="10"
        ></textarea>
        <div className="button-group" style={{ textAlign: "left" }}>
          <button
            style={{ backgroundColor: "green", marginRight: "5px" }}
            onClick={handleSubmit}
          >
            {id ? "Update" : "Add"}
          </button>

          <button
            type="button"
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
