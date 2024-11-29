import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ShopPage from './pages/Shop';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import ServicesPage from './pages/Services.jsx';
import ContactPage from './pages/Contact.jsx';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsLists from './admin/ProductsLists.jsx';
import DashBoardPage from './admin/DashBoardPage.jsx';
import Update from './admin/Update.jsx';
import AddProduct from './admin/AddProduct.jsx';


function App() {
	return (
		<>
			<Header />
			 <Routes>
				<Route path="/" element ={<HomePage/>}/>
				<Route path="/shop"  element ={<ShopPage/>}/>
				<Route path="/products/:id"  element ={<ProductDetailPage/>}/>
				<Route path="/services"  element ={<ServicesPage/>}/>
				<Route path="/contact"  element ={<ContactPage/>}/>
                <Route path="/admin"  element ={<DashBoardPage/>}>
				<Route path="/admin/products"  element ={<ProductsLists/>}/>
				<Route path="/admin/products/update"  element ={<Update/>}/>
				<Route path="/admin/products/addproduct"  element ={<AddProduct/>}/>
			   </Route>
				<Route path="*" element={<NotFoundPage/>}/>
			 </Routes>
			<Footer />
		</>
	);
}


export default App;