import React, { useState, useEffect, createRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import polyline from "polyline";
import L from "leaflet";
import getRoutePolyline from "./getRoutePolyline";
import { useSelector } from "react-redux";

const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=512&id=21613&format=png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapWithPolyline = () => {
  const [decodedPolyline, setDecodedPolyline] = useState([]);
  const selectCoordinates = useSelector(
    (state) => state.routes.selectedRouteIndex
  );

  useEffect(() => {
    async function fetchRoute() {
      try {
        const routePolyline = await getRoutePolyline(selectCoordinates);
        const decoded = polyline.decode(routePolyline);
        setDecodedPolyline(decoded);
      } catch (error) {
        console.error("Ошибка при получении маршрута:", error.message);
      }
    }

    fetchRoute();
  }, [selectCoordinates]);
  const mapRef = createRef();

  useEffect(() => {
    if (decodedPolyline.length > 0) {
      const bounds = L.latLngBounds(decodedPolyline);
      mapRef.current.fitBounds(bounds);
    }
  }, [decodedPolyline, mapRef]);

  return (
    <MapContainer ref={mapRef} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectCoordinates.map((coordinates, index) => (
        <Marker key={index} position={coordinates} icon={customIcon}>
          <Popup>{index + 1} точка</Popup>
        </Marker>
      ))}
      {decodedPolyline.length > 0 && (
        <>
          <Polyline positions={decodedPolyline} color="blue" />
          <Marker position={selectCoordinates[0]} icon={customIcon}>
            <Popup>Начальная точка</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default MapWithPolyline;
