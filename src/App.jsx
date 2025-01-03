import "../src/css/style.css";
import "../src/css/grid.css";
import { Routes, Route } from "react-router-dom";
import ProductTable from "./pages/admin/ProductTable";
import ProductForm from "./pages/admin/ProductForm";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DashBoardPage from "./pages/admin/DashBoardPage";
import NotFoundPage from "./pages/NotFoundPage";
import Category from "./pages/Category";
import LoginForm from "./user/LoginForm";
import { RegisterForm } from "./user/RegisterForm";
import User from "./user/User";
import ScrollToTop from "react-scroll-to-top";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/admin" element={<DashBoardPage />}>
          <Route path="products" element={<ProductTable />} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/update/:id" element={<ProductForm />} />
        </Route>
        <Route path="/user" element={<User />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
