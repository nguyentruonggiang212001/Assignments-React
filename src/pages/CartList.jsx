/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getById } from "../services/productServices";

const CartList = ({ cart, updateCart, removeFromCart }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getById(cart.productId);
      setProduct(data);
    })();
  }, [cart.productId]);

  const totalProduct = (cart) => cart.quantity * product.price;

  const handleQuantityChange = (productID, cart) => {
    if (cart.quantity + cart <= 0) {
      alert("Số lượng không thể nhỏ hơn 1!");
      return;
    }
    if (cart > product.stock) {
      alert(`Số lượng không thể vượt quá tồn kho (${product.stock})!`);
      return;
    }

    updateCart(productID, cart);
  };

  const handleRemoveProduct = (cartId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      removeFromCart(cartId);
    }
  };

  return (
    <div>
      <div className="cart-content">
        <div className="cart-box">
          <h1>Tên hàng</h1>
          <p>{product.title}</p>
          <img
            className="cart-img"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div>
          <span className="price">Giá</span>
          <p className="price-sub">{product.price}$</p>
        </div>
        <div>
          <span>Số lượng</span>
          <div className="total">
            <div className="quantity-control">
              <button
                className="left"
                onClick={() => handleQuantityChange(cart.id, cart.quantity - 1)}
              >
                -
              </button>
              <span className="quantity">{cart.quantity}</span>
              <button
                className="right"
                onClick={() => handleQuantityChange(cart.id, cart.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div>
          <span>Tổng tiền</span>
          <p className="product-total">{totalProduct(cart).toFixed(2)}$</p>
          <div
            className="delete-product"
            style={{ marginTop: "20px" }}
            onClick={() => handleRemoveProduct(cart.id)}
          >
            <i className="fa-regular fa-trash-can"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
