import { useEffect } from "react";
import logo from "../img/e2baa9c4-a867-4560-b6df-58f892730209.jpg";
import box from "../img/cart-content.svg";
import content from "../img/icon-contact.webp";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarts,
  removeCarts,
  editCarts,
} from "../features/products/cartAction";
import CartList from "./CartList";

const CartPage = () => {
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const updateCart = (id, cart) => {
    dispatch(editCarts({ id, cart }));
  };

  const removeFromCart = (cartId) => {
    dispatch(removeCarts(cartId));
  };

  const totalProduct = (cart, product) => {
    if (!product || !product.price) return 0;
    return cart.quantity * product.price;
  };

  const totalAllProduct = (carts) => {
    return carts.reduce((total, cart) => {
      const productTotal = totalProduct(cart, cart.product);
      return total + productTotal;
    }, 0);
  };

  return (
    <div>
      <section>
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="cart-header">
                  <div className="text-cart-header">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="text-first">GIỎ HÀNG</span>
                  </div>
                  <div className="text-cart-sub">
                    <i className="fa-solid fa-box"></i>
                    <span>ĐẶT HÀNG</span>
                  </div>
                  <div className="text-cart-sub">
                    <i className="fa-solid fa-boxes-stacked"></i>
                    <span>HOÀN THÀNH ĐƠN HÀNG</span>
                  </div>
                </div>
                <a href="#">
                  <img className="img-cart" src={logo} alt="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <button className="icon-contact">
          <a href="https://zalo.me/4260866750527113904">
            <img src={content} alt="content" />
          </a>
        </button>
      </div>

      {carts.length < 1 ? (
        <div className="cart-main">
          <img src={box} alt="Empty Cart" />
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <button className="button">
            <a href="/">
              <i className="fa-solid fa-basket-shopping"></i>TIẾP TỤC MUA SẮM
            </a>
          </button>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12 col-12">
              <div>
                {carts.map((cart) => (
                  <CartList
                    key={cart.id}
                    cart={cart}
                    updateCart={updateCart}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-12">
              <div className="cart-content-sub">
                <div className="cart-content-sub-product">
                  <span>ĐƠN HÀNG</span>
                </div>
                <div className="cart-content-total">
                  <p>
                    Tổng giá trị đơn hàng:
                    <span id="total-price">
                      {totalAllProduct(carts).toFixed(2)}$
                    </span>
                  </p>
                </div>
                <button
                  id="check-total"
                  onClick={() =>
                    alert(
                      `Tổng hóa đơn của bạn là ${totalAllProduct(carts).toFixed(
                        2
                      )}$`
                    )
                  }
                >
                  THANH TOÁN HÓA ĐƠN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
