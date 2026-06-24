import { useState } from "react";
import { FiStar, FiMapPin, FiClock } from "react-icons/fi";
import SearchBar from "../../components/SearchBar/SearchBar";
import restaurants from "../../data/restaurants.json";
import "./Restaurants.css";

const CUISINES = ["All", "Sri Lankan", "International", "Seafood & Sri Lankan", "European & Sri Lankan"];

function Restaurants() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.destinationName.toLowerCase().includes(search.toLowerCase());
    const matchCuisine = cuisine === "All" || r.cuisine === cuisine;
    return matchSearch && matchCuisine;
  });

  const priceColor = (range) => {
    if (range === "$") return "var(--color-success)";
    if (range === "$$") return "var(--color-accent)";
    return "var(--color-danger)";
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Restaurants & Dining</h1>
          <p>From fresh-catch seafood to colonial-era dining — taste the best of Sri Lanka.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="dest-controls">
            <SearchBar value={search} onChange={setSearch} placeholder="Search restaurants or location…" />
            <div className="filter-bar" style={{ overflowX: "auto", paddingBottom: 4 }}>
              {CUISINES.map((c) => (
                <button
                  key={c}
                  className={`filter-btn ${cuisine === c ? "active" : ""}`}
                  onClick={() => setCuisine(c)}
                  style={{ flexShrink: 0 }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <h3>No restaurants found</h3>
              <p>Try adjusting your search or cuisine filter.</p>
            </div>
          ) : (
            <div className="restaurants-grid">
              {filtered.map((r) => (
                <div key={r.id} className="restaurant-card card">
                  <div className="restaurant-card__header">
                    <div>
                      <h3>{r.name}</h3>
                      <div className="restaurant-card__location">
                        <FiMapPin size={13} /> {r.destinationName}
                      </div>
                    </div>
                    <div className="restaurant-card__badges">
                      <span
                        className="restaurant-card__price"
                        style={{ color: priceColor(r.priceRange) }}
                      >
                        {r.priceRange}
                      </span>
                      <span className="stars">
                        <FiStar size={13} /> {r.rating}
                      </span>
                    </div>
                  </div>

                  <span className="badge badge-nature restaurant-card__cuisine">
                    {r.cuisine}
                  </span>

                  <p className="restaurant-card__desc">{r.description}</p>

                  <div className="restaurant-card__must">
                    <strong>Must try:</strong> {r.mustTry}
                  </div>

                  <div className="restaurant-card__hours">
                    <FiClock size={13} />
                    {r.openHours}
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

export default Restaurants;
