import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              {/* <span>🇱🇰</span> */}
              <span>Sri Lanka Travel Guide</span>
            </div>
            <p className="footer__tagline">
              Your trusted companion for exploring the Pearl of the Indian Ocean.
              Discover ancient wonders, pristine beaches, and warm hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/travel-tips">Travel Tips</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__section">
            <h4>Contact</h4>
            <ul className="footer__contact">
              <li>
                <FiMapPin />
                <span>Colombo, Sri Lanka</span>
              </li>
              <li>
                <FiPhone />
                <span>+94 11 234 5678</span>
              </li>
              <li>
                <FiMail />
                <span>info@sltravelguide.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} Sri Lanka Travel Guide. All rights reserved.</p>
          <p className="footer__note">
            Made with ❤️ for travelers exploring Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
