import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define custom icons
const fuelIcon = new L.Icon({
  iconUrl: "/fuel-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const restIcon = new L.Icon({
  iconUrl: "/rest-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapView = ({ route, stops, mapRef }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render Route */}
      {route.length > 0 && (
        <Polyline
          positions={route.map((point) => [point.lat, point.lng])}
          color="blue" // Color for the route
          weight={5}
          opacity={0.7}
        />
      )}

      {/* Render Stops */}
      {stops.map((stop, index) => (
        <Marker
          key={index}
          position={[stop.lat, stop.lng]}
          icon={stop.type === "fuel" ? fuelIcon : restIcon}
        >
          <Popup>{`Stop: ${
            stop.type.charAt(0).toUpperCase() + stop.type.slice(1)
          }`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
