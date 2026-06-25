import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Your ultimate companion to explore the beauty, culture, and adventure of Sri Lanka</p>
        </div>
      </div>

      <div className="section">
        <div className="container about-layout">

          {/* Welcome Section */}
          <div className="about-welcome card">
            <div className="about-welcome__content">
              <span className="section-eyebrow">Welcome to</span>
              <h2>🌴 Sri Lankan Travel Guide</h2>
              <p>
                Sri Lanka is a tropical paradise filled with stunning beaches, ancient temples,
                lush forests, and rich cultural heritage. Our web application is designed to
                help travelers easily discover the best destinations, plan trips, and experience
                the true beauty of the Pearl of the Indian Ocean.
              </p>
              <p>
                Whether you are a local explorer or an international visitor, we are here to
                make your Sri Lanka journey easy, enjoyable, and truly unforgettable.
              </p>
              <Link to="/destinations" className="btn btn-primary">
                Start Exploring →
              </Link>
            </div>
            {/* <div className="about-welcome__flag">🇱🇰</div> */}
          </div>

          {/* Mission */}
          <div className="about-mission">
            <div className="about-mission__icon">🎯</div>
            <div className="about-mission__content">
              <h2>Our Mission</h2>
              <p>
                Our mission is to make traveling in Sri Lanka <strong>easy, enjoyable, and
                unforgettable</strong> by providing accurate destination information, helpful
                travel guides, and personalized suggestions — all in one place, right from
                your mobile device.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="about-offers">
            <h2>🌍 What We Offer</h2>
            <p className="about-offers__subtitle">
              We provide a variety of features to help every traveler plan the perfect trip.
            </p>
            <div className="about-offers__grid">
              {[
                {
                  icon: "📍",
                  title: "Popular Destinations",
                  desc: "Discover iconic spots like Sigiriya, Kandy, Ella, Galle Fort, Yala, Nuwara Eliya, Mirissa, and Anuradhapura with full details.",
                },
                {
                  icon: "🏖️",
                  title: "Beach & Nature Guides",
                  desc: "Explore Sri Lanka's pristine beaches, wildlife parks, and breathtaking natural landscapes with tips on the best times to visit.",
                },
                {
                  icon: "🏨",
                  title: "Hotel Suggestions",
                  desc: "Find the best accommodation options across all destinations — from luxury resorts to cozy boutique stays — filtered to suit your budget.",
                },
                {
                  icon: "🗺️",
                  title: "Travel Tips & Planning",
                  desc: "Get practical advice on currency, transport, weather, visas, safety, and local customs so you are always prepared.",
                },
                {
                  icon: "🍽️",
                  title: "Local Food & Culture",
                  desc: "Discover the best local restaurants, must-try dishes, and cultural experiences that make Sri Lanka truly unique.",
                },
                {
                  icon: "📡",
                  title: "Live Weather & Distance",
                  desc: "Check real-time weather at any destination and see how far it is from your current location using GPS.",
                },
              ].map((item) => (
                <div key={item.title} className="offer-card card">
                  <span className="offer-card__icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="about-why card">
            <h2>🌟 Why Choose Us?</h2>
            <ul className="about-why__list">
              {[
                "Easy-to-use and mobile-friendly interface designed for travelers on the go",
                "Trusted and accurate travel information for all major Sri Lanka destinations",
                "Guides for both local and international tourists",
                "Save your favorite destinations and access them anytime",
                "Real-time GPS distance and live weather at every destination",
                "Open Google Maps directly from any destination for easy navigation",
              ].map((item, i) => (
                <li key={i} className="about-why__item">
                  <span className="about-why__check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Developer */}
          <div className="about-developer card">
            <div className="about-developer__avatar">👨‍💻</div>
            <div className="about-developer__info">
              <span className="section-eyebrow">About the Developer</span>
              <h2>Keerthi G.</h2>
              <p>
                This web application was developed by <strong>Keerthi G.</strong> as part of
                the Individual Practical Project for the BSc (Hons) Software Engineering
                programme at the University of Kelaniya, Sri Lanka — with a passion for
                technology and promoting tourism in Sri Lanka.
              </p>
              <div className="about-developer__tags">
                <span className="dev-tag">React Developer</span>
                <span className="dev-tag">University of Kelaniya</span>
              </div>
              <div className="about-developer__contact">
                <div className="dev-contact-item">
                  <span>📧</span>
                  <a href="mailto:gopalavannankeerthi@gmail.com">
                    gopalavannankeerthi@gmail.com
                  </a>
                </div>
                <div className="dev-contact-item">
                  <span>📱</span>
                  <a href="tel:+94754971762">
                    075 497 1762
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="about-contact card">
            <h2>📞 Contact Us</h2>
            <p>Have any questions or suggestions? We would love to hear from you.</p>
            <div className="about-contact__details">
              <div className="contact-detail-item">
                <span>📧</span>
                <a href="mailto:support@srilankatravelguide.com">
                  support@srilankatravelguide.com
                </a>
              </div>
              <div className="contact-detail-item">
                <span>🌐</span>
                <a href="https://www.srilankatravelguide.com" target="_blank" rel="noopener noreferrer">
                  www.srilankatravelguide.com
                </a>
              </div>
            </div>
            <Link to="/contact" className="btn btn-outline" style={{ marginTop: 16 }}>
              Send us a Message
            </Link>
          </div>

          {/* Vision */}
          <div className="about-vision">
            <div className="about-vision__inner">
              <h2>❤️ Our Vision</h2>
              <p>
                We aim to become the <strong>go-to travel platform for Sri Lanka</strong>,
                helping people around the world explore, experience, and fall in love with
                this beautiful island — one destination at a time.
              </p>
              <Link to="/destinations" className="btn btn-accent">
                Explore Destinations →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
