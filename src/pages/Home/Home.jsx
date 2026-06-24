import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiStar, FiHeart, FiNavigation } from "react-icons/fi";
import destinations from "@/data/destination.json";
import "./Home.css";

function Home() {
  const featured = destinations.slice(0, 4);

  const features = [
    {
      icon: "🗺️",
      title: "Browse Attractions",
      desc: "Explore hotels, nature spots, and historical sites filtered by category.",
    },
    {
      icon: "❤️",
      title: "Save Favorites",
      desc: "Bookmark your dream destinations — saved automatically to your device.",
    },
    {
      icon: "📍",
      title: "Live Distance",
      desc: "See how far each spot is from your current GPS location in real-time.",
    },
    {
      icon: "🌤️",
      title: "Live Weather",
      desc: "Check current weather conditions at any destination before you go.",
    },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="hero__eyebrow">Welcome to</span>
          <h1 className="hero__title">
            Pearl of the<br />
            <span className="hero__title-accent">Indian Ocean</span>
          </h1>
          <p className="hero__subtitle">
            Discover ancient ruins, misty highlands, pristine beaches,
            and vibrant culture — all in one magical island.
          </p>
          <div className="hero__cta">
            <Link to="/destinations" className="btn btn-accent">
              Explore Destinations
              <FiArrowRight />
            </Link>
            <Link to="/travel-tips" className="btn btn-outline hero__btn-outline">
              Travel Tips
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>8+</strong>
              <span>Destinations</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>8</strong>
              <span>Featured Hotels</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>1 Island</strong>
              <span>Infinite Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="features-strip">
        <div className="container">
          <div className="features-strip__grid">
            {features.map((f) => (
              <div key={f.title} className="feature-item">
                <span className="feature-item__icon">{f.icon}</span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Top Picks</span>
              <h2>Featured Destinations</h2>
            </div>
            <Link to="/destinations" className="btn btn-outline">
              View All <FiArrowRight />
            </Link>
          </div>

          <div className="featured-grid">
            {featured.map((dest) => (
              <Link key={dest.id} to={`/destinations/${dest.id}`} className="featured-card">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="featured-card__img"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"; }}
                />
                <div className="featured-card__overlay">
                  <span className={`badge badge-${dest.category.toLowerCase()}`}>
                    {dest.category}
                  </span>
                  <h3>{dest.name}</h3>
                  <p className="featured-card__meta">
                    <FiMapPin size={12} /> {dest.district}
                    <span className="featured-card__dot">•</span>
                    <FiStar size={12} /> {dest.rating}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready to explore Sri Lanka?</h2>
            <p>Use GPS location to find attractions near you and plan your perfect trip.</p>
          </div>
          <Link to="/destinations" className="btn btn-accent">
            <FiNavigation />
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
