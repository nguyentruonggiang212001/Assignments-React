import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Shop from './pages/Shop';

function App() {
	return (
		<>
			<Header />
       <h2 style={{marginTop:"100px"}}>Danh Sach San Pham</h2>
			<Shop style={{marginTop:"50px"}} />
			<Footer />
		</>
	);
}


export default App;
