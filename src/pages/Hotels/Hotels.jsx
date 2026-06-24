import { useState } from "react";
import { FiStar, FiWifi, FiMapPin } from "react-icons/fi";
import SearchBar from "../../components/SearchBar/SearchBar";
import hotels from "../../data/hotels.json";
import "./Hotels.css";

const CATEGORIES = ["All", "Luxury", "Mid-Range", "Boutique"];

function Hotels() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = hotels.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.destinationName.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || h.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Hotels & Accommodation</h1>
          <p>Carefully curated stays across Sri Lanka's most beautiful destinations.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="dest-controls">
            <SearchBar value={search} onChange={setSearch} placeholder="Search hotels or destinations…" />
            <div className="filter-bar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${category === cat ? "active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <h3>No hotels found</h3>
              <p>Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="hotels-grid">
              {filtered.map((hotel) => (
                <div key={hotel.id} className="hotel-card card">
                  <div className="hotel-card__img-wrap">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";
                      }}
                    />
                    <span className="hotel-card__cat badge">
                      {hotel.category}
                    </span>
                  </div>
                  <div className="hotel-card__body">
                    <div className="hotel-card__header">
                      <h3 className="hotel-card__name">{hotel.name}</h3>
                      <div className="hotel-card__rating stars">
                        <FiStar size={13} /> {hotel.rating}
                      </div>
                    </div>
                    <div className="hotel-card__location">
                      <FiMapPin size={13} /> {hotel.destinationName}
                    </div>
                    <p className="hotel-card__desc">{hotel.description}</p>
                    <div className="hotel-card__amenities">
                      {hotel.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="hotel-card__amenity">
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="hotel-card__footer">
                      <span className="hotel-card__price">{hotel.price}</span>
                      <a
                        href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + ' Sri Lanka')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary hotel-card__book"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
