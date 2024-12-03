import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../Components/icontokyo-Photoroom.png';
import '../index.css';

function Header({ toggleDarkLight, theme }) {
  return (
    <header>
      <div className="logo">
         <a href='/'><img src={logo} alt="Logo" /></a>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/User/login"><FontAwesomeIcon icon={faUser} /></NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={toggleDarkLight}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}

export default Header;
