import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiNavigation, FiAlertCircle } from "react-icons/fi";
import SearchBar from "../../components/SearchBar/SearchBar";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import { useFavorites } from "../../context/FavoritesContext";
import destinations from "@/data/destination.json";
import "./Destinations.css";

const CATEGORIES = ["All", "Historical", "Nature"];

function Destinations() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "favorites" ? "favorites" : "all"
  ); // 'all' | 'favorites'
  const [userLocation, setUserLocation] = useState(null);
  const [geoStatus, setGeoStatus] = useState("idle"); // idle | loading | success | error
  const { favorites } = useFavorites();

  useEffect(() => {
    if (searchParams.get("tab") === "favorites") setActiveTab("favorites");
  }, [searchParams]);

  // Request geolocation
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("success");
      },
      () => {
        setGeoStatus("error");
      },
      { timeout: 8000 }
    );
  };

  const sourceList = activeTab === "favorites" ? favorites : destinations;

  const filtered = sourceList.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.district.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || d.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Destinations</h1>
          <p>Discover Sri Lanka's most breathtaking places — ancient, wild, and coastal.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Geolocation Banner */}
          <div className="geo-banner">
            {geoStatus === "idle" && (
              <button className="geo-btn" onClick={requestLocation}>
                <FiNavigation />
                Enable location to see distances
              </button>
            )}
            {geoStatus === "loading" && (
              <span className="geo-status">
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Getting your location…
              </span>
            )}
            {geoStatus === "success" && (
              <span className="geo-status geo-status--ok">
                📍 Location enabled — distances shown on each card
              </span>
            )}
            {geoStatus === "error" && (
              <span className="geo-status geo-status--err">
                <FiAlertCircle />
                Location unavailable. Enable in browser settings.
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="dest-tabs">
            <button
              className={`dest-tab ${activeTab === "all" ? "dest-tab--active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Destinations ({destinations.length})
            </button>
            <button
              className={`dest-tab ${activeTab === "favorites" ? "dest-tab--active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              ❤️ Favorites ({favorites.length})
            </button>
          </div>

          {/* Controls */}
          <div className="dest-controls">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or district…" />
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

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <h3>
                {activeTab === "favorites" && favorites.length === 0
                  ? "No favorites yet"
                  : "No destinations found"}
              </h3>
              <p>
                {activeTab === "favorites" && favorites.length === 0
                  ? "Tap the ❤️ on any destination to bookmark it."
                  : "Try adjusting your search or category filter."}
              </p>
            </div>
          ) : (
            <>
              <p className="results-count">
                Showing {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid-cards">
                {filtered.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    userLocation={userLocation}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
