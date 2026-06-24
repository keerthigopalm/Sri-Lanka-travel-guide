import { Link } from "react-router-dom";
import { FiHeart, FiMapPin, FiStar, FiNavigation } from "react-icons/fi";
import { useFavorites } from "../../context/FavoritesContext";
import "./DestinationCard.css";

function DestinationCard({ destination, userLocation }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(destination.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fav ? removeFavorite(destination.id) : addFavorite(destination);
  };

  // Calculate distance using Haversine formula
  const getDistance = () => {
    if (!userLocation) return null;
    const { lat, lng } = destination;
    const R = 6371; // Earth radius in km
    const dLat = ((lat - userLocation.lat) * Math.PI) / 180;
    const dLng = ((lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distance = getDistance();

  return (
    <Link to={`/destinations/${destination.id}`} className="dest-card">
      <div className="dest-card__image-wrap">
        <img
          src={destination.image}
          alt={destination.name}
          className="dest-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";
          }}
        />
        <button
          className={`dest-card__fav ${fav ? "dest-card__fav--active" : ""}`}
          onClick={handleFavorite}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          title={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart />
        </button>
        <span
          className={`dest-card__badge badge badge-${destination.category.toLowerCase()}`}
        >
          {destination.category}
        </span>
      </div>

      <div className="dest-card__body">
        <h3 className="dest-card__name">{destination.name}</h3>

        <div className="dest-card__meta">
          <span className="dest-card__location">
            <FiMapPin size={13} />
            {destination.district}
          </span>
          <span className="dest-card__rating stars">
            <FiStar size={13} />
            {destination.rating}
          </span>
        </div>

        <p className="dest-card__desc">{destination.description}</p>

        {distance && (
          <div className="dest-card__distance">
            <FiNavigation size={13} />
            <span>{distance} km from you</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default DestinationCard;
