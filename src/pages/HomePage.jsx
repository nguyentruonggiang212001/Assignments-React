import { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import "../css/style.css";
import "../css/grid.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productAction";
import slider1 from "../img/slider1.webp";
import slider2 from "../img/slider2.webp";
import slider3 from "../img/slider3.webp";
import { AuthContext } from "../contexts/AuthContext";
import useDebounce from "./../hook/useDebounce";

const HomePage = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [currSlide, setCurrSlide] = useState(0);
  const dotsRef = useRef([]);
  const [itemOffset, setItemOffset] = useState(0);
  const { searchTerm } = useContext(AuthContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const itemsPerPage = 9;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const dataSlide = [
    { id: 1, image: slider1 },
    { id: 2, image: slider2 },
    { id: 3, image: slider3 },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      case "low-high":
        return a.price - b.price;
      case "high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });
  // Tính toán số trang và sản phẩm hiển thị trên trang hiện tại
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );
  // Cập nhật itemOffset khi thay đổi từ khóa tìm kiếm
  useEffect(() => {
    if (searchTerm === "") {
      setItemOffset(0); // Nếu không có từ khóa tìm kiếm, đặt lại trang đầu tiên
    } else {
      // Kiểm tra xem trang hiện tại có hợp lệ khi từ khóa tìm kiếm thay đổi
      const newPageCount = Math.ceil(sortedProducts.length / itemsPerPage);
      if (itemOffset >= newPageCount * itemsPerPage) {
        setItemOffset((newPageCount - 1) * itemsPerPage); // Điều chỉnh lại offset
      }
    }
  }, [searchTerm, sortedProducts.length]);

  // Xử lý sự kiện chuyển trang
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset); // Cập nhật itemOffset khi chuyển trang
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const renderSlide = () => (
    <div className="carousel-inner">
      {dataSlide.map((slide, index) => (
        <div
          key={slide.id}
          className="slide"
          style={{ display: index === currSlide ? "block" : "none" }}
        >
          <img src={slide.image} alt={`Slide ${slide.id}`} />
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrSlide((prevSlide) => (prevSlide + 1) % dataSlide.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Đổi màu dot khi thay đổi slide
  useEffect(() => {
    if (dotsRef.current) {
      dotsRef.current.forEach((dot) => {
        dot.style.backgroundColor = "white";
      });

      if (dotsRef.current[currSlide]) {
        dotsRef.current[currSlide].style.backgroundColor = "red";
      }
    }
  }, [currSlide]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // Render sản phẩm

  const renderProducts = () => {
    if (filteredProducts.length === 0) {
      return (
        <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>
          Không có sản phẩm trong danh mục
        </p>
      );
    } else {
      return (!currentItems.length ? filteredProducts : currentItems).map(
        (item) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={item.id}>
            <div className="product-card">
              <Link to={`/products/${item.id}`}>
                <img src={item.thumbnail} alt={item.title} />
              </Link>
              <div className="product-infor">
                <h2>
                  <a>{item.title}</a>
                </h2>
                <div>Giá: {item.price}$</div>
                <p>Mô tả: {item.description}</p>
                <p>Danh mục: {item.category}</p>
                <button>
                  <Link to={`/products/${item.id}`}>Xem chi tiết</Link>
                </button>
              </div>
            </div>
          </div>
        )
      );
    }
  };

  // Render phân trang
  const renderPagination = () => {
    if (filteredProducts.length > itemsPerPage) {
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

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="carousel">
            {renderSlide()}
            <div className="control">
              <button
                className="prev"
                onClick={() =>
                  setCurrSlide(
                    (currSlide - 1 + dataSlide.length) % dataSlide.length
                  )
                }
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <button
                className="next"
                onClick={() => setCurrSlide((currSlide + 1) % dataSlide.length)}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div className="process">
              {dataSlide.map((_, index) => (
                <div
                  key={index}
                  className="dot"
                  ref={(el) => (dotsRef.current[index] = el)}
                  onClick={() => setCurrSlide(index)}
                ></div>
              ))}
            </div>
          </div>
          <h1
            style={{
              marginTop: "100px",
              textAlign: "center",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Danh Sách Sản Phẩm:
          </h1>
          <section>
            <div className="container">
              <div className="option">
                <label>Sản phẩm theo danh mục:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="beauty">Beauty</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="furniture">Furniture</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-decoration">Home Decoration</option>
                  <option value="kitchen-accessories">
                    Kitchen Accessories
                  </option>
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
                <label>Sắp xếp sản phẩm:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="a-z">Tên (A - Z)</option>
                  <option value="z-a">Tên (Z - A)</option>
                  <option value="low-high">Giá (Thấp - Cao)</option>
                  <option value="high-low">Giá (Cao - Thấp)</option>
                </select>
              </div>
            </div>
          </section>
          {renderProducts()}
        </div>
      </div>
      {renderPagination()}
    </div>
  );
};

export default HomePage;
