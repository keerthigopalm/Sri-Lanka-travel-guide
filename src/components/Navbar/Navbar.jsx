import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiSun, FiMoon, FiSliders } from "react-icons/fi";
import { useFavorites } from "../../context/FavoritesContext";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const themePanelRef = useRef(null);

  const { favorites } = useFavorites();
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (themePanelRef.current && !themePanelRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    };
    if (themeOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [themeOpen]);

  const themeIcon =
    theme === "dark" ? <FiMoon size={18} /> :
    theme === "custom" ? <FiSliders size={18} /> :
    <FiSun size={18} />;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/hotels", label: "Hotels" },
    { to: "/restaurants", label: "Restaurants" },
    { to: "/travel-tips", label: "Travel Tips" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            {/* <span className="navbar__logo-flag">🇱🇰</span> */}
            <span className="navbar__logo-text">
              Sri Lanka <strong>Guide</strong>
            </span>
          </Link>

          <ul className="navbar__links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                  }
                  end={to === "/"}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            {/* Theme Toggle */}
            <div className="navbar__theme-wrap" ref={themePanelRef}>
              <button
                className="navbar__theme-btn"
                onClick={() => setThemeOpen(!themeOpen)}
                title="Change theme"
                aria-label="Theme selector"
              >
                {themeIcon}
              </button>

              {themeOpen && (
                <div className="theme-panel">
                  <p className="theme-panel__label">Choose Theme</p>
                  <div className="theme-options">
                    <button
                      className={`theme-opt ${theme === "light" ? "active" : ""}`}
                      onClick={() => setTheme("light")}
                    >
                      <FiSun size={13} /> Light
                    </button>
                    <button
                      className={`theme-opt ${theme === "dark" ? "active" : ""}`}
                      onClick={() => setTheme("dark")}
                    >
                      <FiMoon size={13} /> Dark
                    </button>
                    <button
                      className={`theme-opt ${theme === "custom" ? "active" : ""}`}
                      onClick={() => setTheme("custom")}
                    >
                      <FiSliders size={13} /> Custom
                    </button>
                  </div>

                  {theme === "custom" && (
                    <div className="theme-custom-pickers">
                      <div className="theme-color-row">
                        <label>Primary Color</label>
                        <span
                          className="theme-color-swatch"
                          style={{ background: customColors.primary }}
                        />
                        <input
                          type="color"
                          value={customColors.primary}
                          onChange={(e) =>
                            setCustomColors({ ...customColors, primary: e.target.value })
                          }
                        />
                      </div>
                      <div className="theme-color-row">
                        <label>Accent Color</label>
                        <span
                          className="theme-color-swatch"
                          style={{ background: customColors.accent }}
                        />
                        <input
                          type="color"
                          value={customColors.accent}
                          onChange={(e) =>
                            setCustomColors({ ...customColors, accent: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/destinations?tab=favorites" className="navbar__fav-btn" title="Favorites">
              <FiHeart />
              {favorites.length > 0 && (
                <span className="navbar__fav-count">{favorites.length}</span>
              )}
            </Link>

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <ul className="mobile-menu__links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
                  }
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__theme">
            <span className="mobile-menu__theme-label">Theme</span>
            <div className="theme-options">
              <button
                className={`theme-opt ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <FiSun size={13} /> Light
              </button>
              <button
                className={`theme-opt ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <FiMoon size={13} /> Dark
              </button>
              <button
                className={`theme-opt ${theme === "custom" ? "active" : ""}`}
                onClick={() => setTheme("custom")}
              >
                <FiSliders size={13} /> Custom
              </button>
            </div>

            {theme === "custom" && (
              <div className="theme-custom-pickers">
                <div className="theme-color-row">
                  <label>Primary Color</label>
                  <span
                    className="theme-color-swatch"
                    style={{ background: customColors.primary }}
                  />
                  <input
                    type="color"
                    value={customColors.primary}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, primary: e.target.value })
                    }
                  />
                </div>
                <div className="theme-color-row">
                  <label>Accent Color</label>
                  <span
                    className="theme-color-swatch"
                    style={{ background: customColors.accent }}
                  />
                  <input
                    type="color"
                    value={customColors.accent}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, accent: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
