import logo from '../Components/icontokyo-Photoroom.png';
import '../index.css'
function Header() {
	return (
		<header>
			<div className="logo">
				<img src={logo} alt="Logo" />
			</div>
			<nav>
				<ul>
					<li>
						<a href="">Home</a>
					</li>
					<li>
						<a href="">Shop</a>
					</li>
					<li>
						<a href="">Services</a>
					</li>
					<li>
						<a href="">Contact</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;