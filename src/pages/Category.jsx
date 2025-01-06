import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import "../css/style.css";
import "../css/grid.css";

const Category = () => {
  const { category } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  // State quản lý lựa chọn sắp xếp
  const [sortOption, setSortOption] = useState("all");
  // Lọc sản phẩm theo danh mục
  const filteredProducts = products
    .filter((product) => product.category === category)
    .map((product) =>
      category === "kitchen-accessories"
        ? { ...product, price: product.price }
        : product
    );
  // Hàm sắp xếp sản phẩm theo lựa chọn
  const sortProducts = (products) => {
    switch (sortOption) {
      case "a-z":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      case "low-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
  // Tính toán số trang và sản phẩm trên mỗi trang
  const sortedProducts = sortProducts(filteredProducts);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );
  // Xử lý sự kiện chuyển trang
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };
  // Hàm hiển thị phân trang
  const renderPagination = () => {
    if (sortedProducts.length > itemsPerPage) {
      return (
        <ReactPaginate
          previousLabel={<i className="fa-solid fa-angle-double-left"></i>}
          nextLabel={<i className="fa-solid fa-angle-double-right"></i>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
        />
      );
    }
    return null;
  };
  // Render danh sách sản phẩm
  const renderProducts = () => {
    if (currentItems.length === 0) {
      return (
        <p style={{ color: "red", fontSize: "20px" }}>
          Không có sản phẩm trong danh mục
        </p>
      );
    } else {
      return currentItems.map((item) => (
        <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={item.id}>
          <div className="product-card">
            <Link to={`/products/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} />
            </Link>
            <div className="product-infor">
              <h2>
                <a>{item.title}</a>
              </h2>
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
                  <span style={{ color: "rgb(255, 87, 34)" }}>
                    {item.price}$
                  </span>
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
          <h1
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Sản Phẩm: {category}
          </h1>
          {category === "kitchen-accessories" && (
            <p style={{ color: "green", fontSize: "18px" }}>
              Giảm giá 10% cho danh mục này!
            </p>
          )}
          <div className="option">
            <label>Sắp xếp sản phẩm:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{ marginBottom: "20px" }}
            >
              <option value="all">Tất cả</option>
              <option value="a-z">Tên (A - Z)</option>
              <option value="z-a">Tên (Z - A)</option>
              <option value="low-high">Giá (Thấp - Cao)</option>
              <option value="high-low">Giá (Cao - Thấp)</option>
            </select>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            renderProducts()
          )}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Category;
