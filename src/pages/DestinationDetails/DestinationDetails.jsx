import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiArrowLeft, FiMapPin, FiStar, FiHeart, FiExternalLink,
  FiClock, FiDollarSign, FiCalendar, FiNavigation
} from "react-icons/fi";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchWeather, getWeatherDescription, getWeatherEmoji } from "@/services/api";
import destinations from "@/data/destination.json";
import hotels from "@/data/hotels.json";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const destination = destinations.find((d) => d.id === parseInt(id));
  const nearbyHotels = hotels.filter((h) => h.destinationId === parseInt(id));

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!destination) return;

    // Fetch live weather
    setWeatherLoading(true);
    setWeatherError(false);
    fetchWeather(destination.lat, destination.lng)
      .then((data) => {
        setWeather(data.current_weather);
        setWeatherLoading(false);
      })
      .catch(() => {
        setWeatherError(true);
        setWeatherLoading(false);
      });

    // Get user location for distance
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, [id, destination]);

  if (!destination) {
    return (
      <div className="container section">
        <div className="empty-state">
          <h3>Destination not found</h3>
          <Link to="/destinations" className="btn btn-primary" style={{ marginTop: 16 }}>
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(destination.id);

  const handleFav = () => {
    fav ? removeFavorite(destination.id) : addFavorite(destination);
  };

  // Calculate distance from user
  const getDistance = () => {
    if (!userLocation) return null;
    const R = 6371;
    const dLat = ((destination.lat - userLocation.lat) * Math.PI) / 180;
    const dLng = ((destination.lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((destination.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const distance = getDistance();

  // Google Maps URL deep-link
  const mapsUrl = `https://www.google.com/maps?q=${destination.lat},${destination.lng}`;
  const geoUrl = `geo:${destination.lat},${destination.lng}`;

  return (
    <div className="details">
      {/* Hero Image */}
      <div className="details__hero">
        <img
          src={destination.image}
          alt={destination.name}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80";
          }}
        />
        <div className="details__hero-overlay">
          <div className="container">
            <button className="details__back" onClick={() => navigate(-1)}>
              <FiArrowLeft /> Back
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="details__layout">
          {/* Main Content */}
          <div className="details__main">
            {/* Title Row */}
            <div className="details__title-row">
              <div>
                <span className={`badge badge-${destination.category.toLowerCase()}`}>
                  {destination.category}
                </span>
                <h1 className="details__name">{destination.name}</h1>
                <div className="details__meta">
                  <span><FiMapPin size={14} /> {destination.district} District</span>
                  <span className="stars"><FiStar size={14} /> {destination.rating} rating</span>
                  {distance && (
                    <span style={{ color: "var(--color-primary)" }}>
                      <FiNavigation size={14} /> {distance} km from you
                    </span>
                  )}
                </div>
              </div>
              <button
                className={`details__fav-btn ${fav ? "details__fav-btn--active" : ""}`}
                onClick={handleFav}
                aria-label={fav ? "Remove from favorites" : "Save to favorites"}
              >
                <FiHeart />
                {fav ? "Saved" : "Save"}
              </button>
            </div>

            <p className="details__desc">{destination.description}</p>

            {/* Info Grid */}
            <div className="info-grid">
              <div className="info-item">
                <FiClock className="info-item__icon" />
                <div>
                  <span className="info-item__label">Open Hours</span>
                  <span className="info-item__value">{destination.openHours}</span>
                </div>
              </div>
              <div className="info-item">
                <FiDollarSign className="info-item__icon" />
                <div>
                  <span className="info-item__label">Entry Fee</span>
                  <span className="info-item__value">{destination.entryFee}</span>
                </div>
              </div>
              <div className="info-item">
                <FiCalendar className="info-item__icon" />
                <div>
                  <span className="info-item__label">Best Time to Visit</span>
                  <span className="info-item__value">{destination.bestTime}</span>
                </div>
              </div>
            </div>

            {/* Things to Do */}
            <div className="details__section">
              <h2>Things to Do</h2>
              <ul className="todo-list">
                {destination.thingsToDo.map((thing, i) => (
                  <li key={i} className="todo-item">
                    <span className="todo-item__dot">✓</span>
                    {thing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby Hotels */}
            {nearbyHotels.length > 0 && (
              <div className="details__section">
                <h2>Nearby Hotels</h2>
                <div className="nearby-hotels">
                  {nearbyHotels.map((hotel) => (
                    <div key={hotel.id} className="hotel-mini">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80";
                        }}
                      />
                      <div className="hotel-mini__body">
                        <h4>{hotel.name}</h4>
                        <span className="badge badge-historical">{hotel.category}</span>
                        <p className="hotel-mini__price">{hotel.price}</p>
                        <div className="stars hotel-mini__rating">
                          <FiStar size={12} /> {hotel.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="details__sidebar">
            {/* Weather Card */}
            <div className="weather-card">
              <h3>Live Weather</h3>
              {weatherLoading && (
                <div className="spinner-container" style={{ padding: 20 }}>
                  <div className="spinner" />
                  <span>Loading weather…</span>
                </div>
              )}
              {weatherError && (
                <p className="weather-error">Unable to load weather data.</p>
              )}
              {weather && !weatherLoading && (
                <div className="weather-data">
                  <div className="weather-data__main">
                    <span className="weather-data__emoji">
                      {getWeatherEmoji(weather.weathercode)}
                    </span>
                    <span className="weather-data__temp">
                      {Math.round(weather.temperature)}°C
                    </span>
                  </div>
                  <p className="weather-data__desc">
                    {getWeatherDescription(weather.weathercode)}
                  </p>
                  <div className="weather-data__wind">
                    💨 Wind: {Math.round(weather.windspeed)} km/h
                  </div>
                </div>
              )}
            </div>

            {/* Map Link */}
            <div className="map-card">
              <h3>Location</h3>
              <p className="map-card__coords">
                {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
              </p>
              <div className="map-card__actions">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FiExternalLink />
                  Open in Google Maps
                </a>
                <a href={geoUrl} className="btn btn-outline">
                  <FiNavigation />
                  Open in Maps App
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;
