import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Sri Lanka Travel Guide</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/destinations">Destinations</Link>
        </li>

        <li>
          <Link to="/hotels">Hotels</Link>
        </li>

        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>

        <li>
          <Link to="/travel-tips">Travel Tips</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
