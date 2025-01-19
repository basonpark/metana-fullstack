import { Link } from 'react-router-dom';
import './Navigation.css';
function Navigation() {
  return (
    <nav id="navigation">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/blogs" className="nav-item">
        Blogs
      </Link>
      <Link to="/about" className="nav-item">
        About
      </Link>
      <Link to="/projects" className="nav-item">
        Projects
      </Link>
      <Link to="/contact" className="nav-item">
        Contact
      </Link>
      <Link to="/login" className="nav-item">
        Login
      </Link>
    </nav>
  );
}

export default Navigation;
