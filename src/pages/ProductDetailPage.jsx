import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getByCategory, getById } from "../services/productServices";
import "../css/style.css";
import "../css/grid.css";
import zaloIcon from "../img/Icon_of_Zalo.svg.png";
import giftbox from "../img/giftbox.svg";
import saleOnline from "../img/sale-online.svg";
import tick from "../img/Flat_tick_icon.svg";
import ship from "../img/Ship.png";
import process from "../img/process.svg";
import moneyBag from "../img/money-bag.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createCart,
  editCarts,
  fetchCarts,
} from "./../features/products/cartAction";
import { fetchProducts } from "../features/products/productAction";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const { carts } = useSelector((state) => state.carts);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCarts(user.id));
    }
  }, [user.id, dispatch]);

  const addCart = async (productId, product) => {
    const key = `${product.title}_${product.id}`;

    // Kiểm tra nếu số lượng trong giỏ hàng đã bằng hoặc lớn hơn số lượng tồn kho
    const cartQuantity = carts.find((item) => item.id === key)?.quantity || 0;
    if (cartQuantity >= product.stock) {
      alert(
        "Số lượng sản phẩm trong giỏ hàng không được vượt quá số lượng tồn kho!"
      );
      return;
    }

    const cartInfor = {
      productId,
      cartPrice: product.price,
      quantity: 1,
      userId: user.id,
      id: key,
    };

    const existItem = carts.find((item) => item.id === key);
    let updateItem;
    if (existItem) {
      updateItem = {
        ...existItem,
        quantity: existItem.quantity + 1,
      };
      dispatch(editCarts({ id: updateItem.id, cart: updateItem }));
      alert("Sản phẩm đã được cập nhật số lượng trong giỏ hàng!");
      return;
    }

    dispatch(createCart(cartInfor));
    alert("Sản phẩm đã được thêm vào giỏ hàng");
  };

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          dispatch(fetchProducts(id));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getById(id);
        setData(data);

        // Lấy các sản phẩm gợi ý sau khi nhận được sản phẩm hiện tại
        const suggested = await getByCategory(data.category);

        // Lọc theo danh mục và loại bỏ sản phẩm hiện tại khỏi danh sách gợi ý
        const filteredSuggested = suggested.filter(
          (product) => product.id !== data.id
        );

        // Nếu danh mục là "kitchen-accessories", áp dụng giảm giá 10%
        const discountedProducts = filteredSuggested.map((product) =>
          data.category === "kitchen-accessories"
            ? { ...product, price: (product.price * 0.9).toFixed(2) }
            : product
        );
        setSuggestedProducts(discountedProducts);
      })();
    }
  }, [id, data.category]); // Ensure that useEffect runs when data.category changes

  const renderStars = (rating) => {
    const stars = [];
    const poinStars = [1, 2, 3, 4, 5];

    for (const starNow of poinStars) {
      if (rating >= starNow) {
        stars.push(<i key={starNow} className="fa-solid fa-star"></i>);
      } else if (rating >= starNow - 0.5) {
        stars.push(
          <i key={starNow} className="fa-solid fa-star-half-stroke"></i>
        );
      } else {
        stars.push(<i key={starNow} className="fa-regular fa-star"></i>);
      }
    }

    return stars;
  };

  const formatToVietnamTime = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      <div className="container">
        <section>
          <div className="header-contenxt">
            <div className="container">
              <ul>
                <li>
                  <a href="./index.html">Trang chủ |</a>
                </li>
                <li>Sản phẩm của Tokyolife</li>
              </ul>
            </div>
          </div>
        </section>
        <div className="row">
          <div className="col-lg-6 col-sm-12 col-12">
            <img className="detail-img" src={data.thumbnail} alt={data.title} />
          </div>
          <div className="col-lg-6 col-sm-12 col-12">
            <div className="content-product">
              <p className="header">
                {data.category === "kitchen-accessories"
                  ? "Giảm Giá "
                  : "Bán Chạy"}
              </p>
              <h1>Sản Phẩm {data.title}</h1>
              <p className="quantity-text">
                <span style={{ fontWeight: 600 }}>Hãng:</span> {data.brand}
              </p>
              <div className="SKU">
                <span style={{ fontWeight: 600, color: "black" }}>
                  Mã sản phẩm:
                </span>
                {data.sku}
              </div>
              <p>
                <span style={{ fontWeight: 600 }}>Danh Mục Sản Phẩm:</span>
                {data.category}
              </p>
              <div className="description">
                <p>
                  <span style={{ fontWeight: 600 }}>Chi tiết sản phẩm:</span>
                  {data.description}
                </p>
              </div>
              <div className="content-price">
                <div>
                  <div className="price">
                    {data.category === "kitchen-accessories" ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                            marginRight: "10px",
                          }}
                        >
                          {parseFloat(data.price / 0.9).toFixed(2)}$
                        </span>
                        <span className="price">{data.price}$</span>
                      </>
                    ) : (
                      <div>{data.price}$</div>
                    )}
                  </div>
                </div>
                <div className="stock">
                  <span>Còn hàng</span>
                  <img src={tick} alt="tick" />
                </div>
              </div>
              <div className="promotion">
                <div className="line"></div>
                <div className="title">
                  <span>KHUYẾN MÃI</span>
                </div>
                <div className="sale">
                  <ul>
                    <li>
                      <img src={giftbox} alt="box" />
                      <p>
                        Mua áo chống nắng dáng dài chỉ từ
                        <strong style={{ marginLeft: "4px" }}>
                          325.000đ
                        </strong>{" "}
                        .<a href="#">Xem hướng dẫn.</a>
                      </p>
                    </li>
                    <li>
                      <img src={giftbox} alt="box" />
                      <p>
                        <strong>GIẢM 10% tối đa 100K</strong> cho đơn từ
                        333.000đ khi nhập <strong>LUCKY11</strong> tại bước
                        thanh toán.
                        <a href="#">Sao chép</a>
                      </p>
                    </li>
                    <li>
                      <img src={giftbox} alt="box" />
                      <p>
                        Nhập <strong>HPBD111</strong> giảm ngay
                        <strong style={{ marginLeft: "4px" }}>111K</strong> tại
                        bước thanh toán cho đơn từ 888.000đ.{" "}
                        <a href="#">Sao chép</a>
                      </p>
                    </li>
                    <li>
                      <img src={giftbox} alt="box" />
                      <p>
                        Săn sale <span>giày thể thao</span> chỉ từ
                        <strong style={{ marginLeft: "4px" }}>499.000đ.</strong>
                        <a href="#">Xem ngay</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product-box">
                <div className="box">
                  <img src={saleOnline} alt="sale" />
                  <p>Giá độc quyền online</p>
                </div>
              </div>
              <div className="zalo">
                <img src={zaloIcon} alt="zalo" />
                <p>Chat ngay để nhận tư vấn sản phẩm</p>
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
              <div className="stock">
                <div>
                  <p>
                    <span style={{ fontWeight: "600px" }}>Còn:</span>
                    {data.stock} sản phẩm
                  </p>
                </div>
              </div>
              <div className="buy">
                <button className="buy-cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>
                    <a
                      className="add-product"
                      href="#!"
                      onClick={() => addCart(id, data)}
                    >
                      Thêm giỏ hàng
                    </a>
                  </span>
                </button>
                <button className="buy-bag">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span>
                    <a href="/cart">Mua ngay</a>
                  </span>
                </button>
              </div>
              <div className="market-product">
                <button className="market">
                  <p>
                    <a href="/">Cửa hàng có sẵn sản phẩm</a>
                  </p>
                </button>
              </div>
              <div className="service">
                <div className="service-sub">
                  <img src={ship} alt="ship" />
                  <p>Miễn phí giao hàng xem tại giỏ hàng(*)</p>
                </div>
                <div className="service-sub">
                  <img src={process} alt="process" />
                  <p>1 đổi 1 trong vòng 7 ngày</p>
                </div>
                <div className="service-sub">
                  <img src={moneyBag} alt="money-bag" />
                  <p>Kiểm tra hàng trước khi thanh toán</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="review">
        <div className="container">
          <div className="review-header">
            <h6>ĐÁNH GIÁ TỪ NGƯỜI MUA</h6>
          </div>
          <div className="row">
            <div className="col-lg-6  col-12">
              <div className="review-left">
                <div className="review-left-body">
                  <div className="review-text-left">
                    <h3>
                      <span style={{ fontSize: "38px" }}>{data.rating}</span>
                      <span style={{ fontSize: "28px" }}>/5</span>
                    </h3>
                    <div className="star">{renderStars(data.rating)}</div>
                  </div>
                  <div className="review-left-sub">
                    <div className="review-star-sub">
                      <p>
                        5<i className="fa-solid fa-star"></i>
                        <span className="review-first"></span>
                      </p>
                    </div>
                    <div className="review-star-sub">
                      <p>
                        4<i className="fa-solid fa-star"></i>
                        <span></span>
                      </p>
                    </div>
                    <div className="review-star-sub">
                      <p>
                        3<i className="fa-solid fa-star"></i>
                        <span></span>
                      </p>
                    </div>
                    <div className="review-star-sub">
                      <p>
                        2<i className="fa-solid fa-star"></i>
                        <span></span>
                      </p>
                    </div>
                    <div className="review-star-sub">
                      <p>
                        1<i className="fa-solid fa-star"></i>
                        <span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="review-right">
                <div className="review-right-body">
                  <p>Hình ảnh từ người mua</p>
                  <img
                    className="img-right"
                    src={data.thumbnail}
                    alt={data.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
            </div>
            <div className="line-sub"></div>

            <div className="col-12">
              <div className="reviews-list">
                {data.reviews?.map((review, index) => (
                  <div key={index} className="review-item">
                    <p className="reviewer-name">{review.reviewerName}</p>
                    <div
                      className="review-rating"
                      style={{ color: "rgb(250, 175, 0)" }}
                    >
                      {renderStars(review.rating)}
                    </div>
                    <p className="review-comment">
                      Đánh giá về sản phẩm: {review.comment}
                    </p>
                    <p className="review-date">
                      Đã đánh giá vào lúc: {formatToVietnamTime(review.date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="suggested-products">
        <div className="container">
          <h2>Một số sản phẩm cùng loại bạn có thể mua :</h2>
          <div className="row">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-sm-6 col-12">
                <div className="product-card">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.thumbnail} alt={product.title} />
                  </Link>
                  <div className="product-infor">
                    <h2>
                      <a>{product.title}</a>
                    </h2>
                    <div>Giá: {product.price}$</div>
                    <p>Danh mục: {product.category}</p>
                    <button>
                      <Link to={`/products/${product.id}`}>Mua ngay</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
