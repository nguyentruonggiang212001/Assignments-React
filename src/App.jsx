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
import ProductsTable from './admin/ProductsTable.jsx';
import DashBoardPage from './admin/DashBoardPage.jsx';
import ProductForm from './admin/ProductForm.jsx';




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
				<Route path="products"  element ={<ProductsTable/>}/>
			    <Route path="products/add" element={<ProductForm />} />
				<Route path="products/update/:id" element={<ProductForm />} />
			   </Route>
				<Route path="*" element={<NotFoundPage/>}/>
			 </Routes>
			<Footer />
		</>
	);
}


export default App;