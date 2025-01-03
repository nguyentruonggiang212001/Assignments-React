import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import "../css/grid.css";
import logo from "../img/icontokyo-Photoroom.png";
import banner from "../img/banner.jpg";
import logoMobie from "../img/LogoMenuMobile.0bf1ee6a.svg";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const [search, setSearch] = useState("");
  const { setSearchTerm } = useContext(AuthContext);

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.trim().toLowerCase());
  };

  const handleSearchSubmit = () => {
    setSearchTerm(search);
  };

  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <input type="checkbox" id="check" style={{ display: "none" }} />
      <label className="overlay" htmlFor="check"></label>
      <input type="checkbox" id="check-women" style={{ display: "none" }} />
      <input type="checkbox" id="check-men" style={{ display: "none" }} />
      <header>
        <div className="container">
          <div className="nav-header">
            <div className="img">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="search-box">
              <input
                type="text"
                id="search-input"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={handleSearchInputChange}
              />
              <button id="search-button" onClick={handleSearchSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="header-icon">
              <div className="header-icon-cart">
                <Link to="/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </div>
              <div className="header-icon-box">
                <i className="fa-solid fa-box"></i>
              </div>
              {user?.email ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span> {user.email}</span>
                  <div style={{ marginLeft: "5px" }}>
                    <i
                      onClick={logout}
                      className="fa-solid fa-arrow-right-from-bracket"
                    ></i>
                  </div>
                </div>
              ) : (
                <div className="header-icon-user">
                  <Link to="/User/login">
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </div>
              )}
              <label className="header-icon-bar" htmlFor="check">
                <i className="fa-solid fa-bars"></i>
              </label>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <div className="nav-sub">
            <ul>
              <div className="img-sub">
                <img src={banner} alt="banner" className="img-sub-first" />
                <img src={logoMobie} className="img-sub-second" alt="logo" />
              </div>
              <li>
                <Link to="/category/kitchen-accessories" className="link">
                  Siêu Sale
                </Link>
              </li>
              <li>
                <div className="toggle-pc">
                  <label className="toggle-label">
                    Nữ
                    <i
                      className="fa-solid fa-caret-down"
                      htmlFor="check-women"
                    ></i>
                  </label>
                  <div className="dropdown">
                    <div className="dropdown-girl">
                      <Link to="/category/beauty">Làm Đẹp Nữ</Link>
                      <Link to="/category/womens-dresses">Váy Nữ</Link>
                      <Link to="/category/womens-shoes">Giày Nữ</Link>
                      <Link to="/category/womens-watches">Đồng Hồ Nữ</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="toggle-pc">
                  <label className="toggle-label">
                    Nam<i className="fa-solid fa-caret-down"></i>
                  </label>
                  <div className="dropdown">
                    <div className="dropdown-boy">
                      <Link to="/category/mens-shirts">Áo Nam</Link>
                      <Link to="/category/mens-shoes">Giày Nam</Link>
                      <Link to="/category/mens-watches">Đồng Hồ Nam</Link>
                      <Link to="/category/laptops">Laptops Nam</Link>
                    </div>
                  </div>
                </div>
              </li>
              <div className="toggle-mb">
                <label htmlFor="check-women" className="toggle-label">
                  Nữ<i className="fa-solid fa-caret-down"></i>
                </label>
                <div className="dropdown-women">
                  <Link to="/category/beauty">Làm Đẹp Nữ</Link>
                  <Link to="/category/womens-dresses">Váy Nữ</Link>
                  <Link to="/category/womens-shoes">Giày Nữ</Link>
                  <Link to="/category/womens-watches">Đồng Hồ Nữ</Link>
                </div>
              </div>
              <div className="toggle-mb">
                <label htmlFor="check-men" className="toggle-label">
                  Nam<i className="fa-solid fa-caret-down"></i>
                </label>
                <div className="dropdown-men">
                  <Link to="/category/mens-shirts">Áo Nam</Link>
                  <Link to="/category/mens-shoes">Giày Nam</Link>
                  <Link to="/category/mens-watches">Đồng Hồ Nam</Link>
                  <Link to="/category/laptops">Laptops Nam</Link>
                </div>
              </div>
              <li>
                <Link to="/category/sports-accessories">Vật Dụng Thể Thao</Link>
              </li>
              <li>
                <Link to="/category/sunglasses">Kính</Link>
              </li>
              <li>
                <Link to="/category/home-decoration">Trang Trí Nhà</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="search-sub">
        <div className="search-box-sub">
          <input
            type="text"
            id="search-input-sub"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={handleSearchInputChange}
          />
          <button id="search-button-sub">
            <i className="fa fa-search" onClick={handleSearchSubmit}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
