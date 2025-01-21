import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './Navigation.css';

function NavItem({ url, children}) {
  return (
    <Link
    className="px-4 py-2 mx-2 my-2 border border-x-0 border-t-0 border-b-green-500 text-green-500 bg-white rounded-sm hover:bg-green-500 hover:text-white"
    to={url}
  >
    {children}
  </Link>
  )
}

// Plain navigation link without underline
function NavItemPlain({ url, children }) {
  return (
    <Link
      className="px-4 py-2 mx-2 my-2 text-green-500 bg-white rounded-sm hover:bg-green-500 hover:text-white"
      to={url}
    >
      {children}
    </Link>
  );
}

function Navigation() {
  const { user, isLoggedIn } = useAuth();
  return (
    <nav id="navigation">
      <NavItem to="/" className="nav-item">
        Home
      </NavItem>
      <NavItem to="/blogs" className="nav-item">
        Blogs
      </NavItem>
      <NavItem to="/about" className="nav-item">
        About
      </NavItem>
      <NavItem url="/projects" className="nav-item">
        Projects
      </NavItem>
      <NavItem url="/contact" className="nav-item">
        Contact
      </NavItem>
      {isLoggedIn ? (
        <NavItemPlain to="/profile">
          {user.name}
        </NavItemPlain>
      ) : (
        <NavItemPlain to="/login">
          Log in
        </NavItemPlain>
      )}
    </nav>
  );
}

export default Navigation;
