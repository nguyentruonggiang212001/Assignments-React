import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { schemaProduct } from "../../schemas/productShema";
import { useEffect, useState } from "react";
import { getById } from "../../services/productServices";
import { useDispatch } from "react-redux";
import instance from "../../services";
import { fetchProducts } from "../../features/products/productAction";
const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
const ProductForm = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailOption, setThumbnailOption] = useState("keep");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schemaProduct),
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn reset các trường?")) {
      reset();
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
      dispatch(fetchProducts());
    } else {
      setIsAdmin(false);
      return;
    }

    if (id) {
      (async () => {
        try {
          const data = await getById(id);
          reset(data);
          setThumbnailUrl(data.thumbnail);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      })();
    }
  }, [id, dispatch, reset]);

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    return data.secure_url;
  };
  const onSubmit = async (product) => {
    try {
      let updatedProduct = { ...product };
      // Kiểm tra lựa chọn của admin và xử lý tương ứng
      switch (thumbnailOption) {
        case "upload":
          // Xư ̉ lý upload ảnh nê ́u admin chọn upload từ local
          if (product.thumbnail && product.thumbnail[0]) {
            const thumbnailUrl = await uploadImage(product.thumbnail[0]);
            updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
          }
          break;
        default:
      }
      if (id) {
        const { data } = await instance.patch(
          `/products/${id}`,
          updatedProduct
        );
        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { id, product: updatedProduct },
        });
        console.log(data);
      } else {
        const { data } = await instance.post("/products", updatedProduct);
        dispatch({ type: "ADD_PRODUCT", payload: data });
        console.log(data);
      }
      nav("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form-user" style={{ marginTop: "200px" }}>
      <h1
        className="header-update"
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {id ? "Cập nhật" : "Thêm mới"} sản phẩm
      </h1>
      <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          id="brand"
          placeholder="Brand"
          {...register("brand", { required: true })}
        />
        {errors.brand && (
          <p style={{ color: "red" }}>{errors.brand?.message}</p>
        )}
        <label htmlFor="sku">SKU</label>
        <input
          type="text"
          name="sku"
          id="sku"
          placeholder="SKU"
          {...register("sku", { required: true })}
        />
        {errors.sku && <p style={{ color: "red" }}>{errors.sku?.message}</p>}
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          id="stock"
          placeholder="Stock"
          {...register("stock", { required: true, valueAsNumber: true })}
        />
        {errors.stock && (
          <p style={{ color: "red" }}>{errors.stock?.message}</p>
        )}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          {...register("category", { required: "Please select a category" })}
        >
          <option value="">Select Category</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
          <option value="kitchen-accessories">Kitchen Accessories</option>
          <option value="laptops">Laptops</option>
          <option value="mens-shirts">Men Shirts</option>
          <option value="mens-shoes">Men Shoes</option>
          <option value="mens-watches">Men Watches</option>
          <option value="mobile-accessories">Mobile Accessories</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="skin-care">Skin Care</option>
          <option value="smartphones">Smartphones</option>
          <option value="sports-accessories">Sports Accessories</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="tablets">Tablets</option>
          <option value="tops">Tops</option>
          <option value="vehicle">Vehicle</option>
          <option value="womens-bags">Women Bags</option>
          <option value="womens-dresses">Women Dresses</option>
          <option value="womens-jewellery">Women Jewellery</option>
          <option value="womens-shoes">Women Shoes</option>
          <option value="womens-watches">Women Watches</option>
        </select>
        {errors.category && (
          <p style={{ color: "red" }}>{errors.category?.message}</p>
        )}
        <label htmlFor="thumbnailOption" className="formlabel">
          Choose Thumbnail Option
        </label>
        <select
          className="form-control"
          id="thumbnailOption"
          value={thumbnailOption}
          onChange={(e) => setThumbnailOption(e.target.value)}
        >
          <option value="keep">Keep Current Thumbnail</option>
          <option value="link">Add Thumbnail from Link</option>
          <option value="upload">Upload Thumbnail from Local</option>
        </select>
        <label htmlFor="thumbnail" className="form-label">
          Thumbnail
        </label>
        {thumbnailOption === "link" && (
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            {...register("thumbnail")}
          />
        )}
        {thumbnailOption === "upload" && (
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            {...register("thumbnail", { required: true })}
          />
        )}
        {errors.thumbnail?.message && (
          <p className="textdanger">{errors.thumbnail?.message}</p>
        )}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Product Thumbnail"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}

        <div
          className="button-group"
          style={{ textAlign: "left", marginTop: "20px" }}
        >
          <button
            style={{ backgroundColor: "green", marginRight: "5px" }}
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
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
