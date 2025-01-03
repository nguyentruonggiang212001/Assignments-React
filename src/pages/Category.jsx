import { useEffect } from "react";
import { fetchProducts } from "../features/products/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "../css/style.css";
import "../css/grid.css";

const Category = () => {
  const { category } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Lọc và áp dụng giảm giá nếu là "kitchen-accessories"
  const filteredProducts = products
    .filter((product) => product.category === category)
    .map((product) =>
      category === "kitchen-accessories"
        ? { ...product, price: (product.price * 0.9).toFixed(2) } // giảm giá 10%
        : product
    );

  const renderProducts = () => {
    if (filteredProducts.length === 0) {
      return (
        <p style={{ color: "red", fontSize: "20px" }}>
          Không có sản phẩm trong danh mục
        </p>
      );
    } else {
      return filteredProducts.map((item) => (
        <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={item.id}>
          <div className="product-card">
            <Link to={`/products/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} />
            </Link>
            <div className="product-infor">
              <h2>
                <a>{item.title}</a>
              </h2>
              {/* Hiển thị giá với định dạng giá cũ và giá mới */}
              <div>
                {category === "kitchen-accessories" ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    >
                      {parseFloat(item.price / 0.9).toFixed(2)}$
                    </span>
                    <span
                      style={{
                        color: "#ff5722",
                        fontSize: "16px",
                        fontWeight: "100",
                      }}
                    >
                      {item.price}$
                    </span>
                  </>
                ) : (
                  <span>{item.price}$</span>
                )}
              </div>
              <p>Mô tả: {item.description}</p>
              <p>Danh mục: {item.category}</p>
              <button>
                <Link to={`/products/${item.id}`}>Xem chi tiết</Link>
              </button>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="container">
        <div className="row">
          <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
            Sản Phẩm: {category}
          </h1>
          {category === "kitchen-accessories" && (
            <p style={{ color: "green", fontSize: "18px" }}>
              Giảm giá 10% cho danh mục này!
            </p>
          )}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            renderProducts()
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
