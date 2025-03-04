import React, { useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import TaskWrapper from "../TaskWrapper";

interface MapTaskProps {
  title: string;
  description: string;
  onLocationSelect: (positions: Array<{ lat: number; lng: number }>) => void;
  initialCenter?: { lat: number; lng: number };
}

const defaultIcon = L.icon({
  iconUrl: "/node_modules/leaflet/dist/images/marker-icon.png",
  iconRetinaUrl: "/node_modules/leaflet/dist/images/marker-icon-2x.png",
  shadowUrl: "/node_modules/leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const defaultCenter = { lat: 45.815399, lng: 15.966568 }; // Zagreb coordinates

interface LocationMarkersProps {
  positions: Array<{ lat: number; lng: number }>;
  onPositionAdd: (lat: number, lng: number) => void;
  onPositionRemove: (index: number) => void;
}

const LocationMarkers: React.FC<LocationMarkersProps> = ({
  positions,
  onPositionAdd,
  onPositionRemove,
}) => {
  useMapEvents({
    click: (e) => {
      onPositionAdd(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <>
      {positions.map((position, index) => (
        <Marker
          key={`${position.lat}-${position.lng}-${index}`}
          position={[position.lat, position.lng]}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              onPositionRemove(index);
            },
          }}
        />
      ))}
    </>
  );
};

const MapTask: React.FC<MapTaskProps> = ({
  title,
  description,
  onLocationSelect,
  initialCenter = defaultCenter,
}) => {
  const [positions, setPositions] = useState<
    Array<{ lat: number; lng: number }>
  >([]);

  const handlePositionAdd = useCallback(
    (lat: number, lng: number) => {
      setPositions((prev) => {
        const newPositions = [...prev, { lat, lng }];
        onLocationSelect(newPositions);
        return newPositions;
      });
    },
    [onLocationSelect]
  );

  const handlePositionRemove = useCallback(
    (index: number) => {
      setPositions((prev) => {
        const newPositions = prev.filter((_, i) => i !== index);
        onLocationSelect(newPositions);
        return newPositions;
      });
    },
    [onLocationSelect]
  );

  return (
    <TaskWrapper title={title} description={description}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        height="500px"
        overflow="hidden"
        position="relative"
      >
        <MapContainer
          center={[initialCenter.lat, initialCenter.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarkers
            positions={positions}
            onPositionAdd={handlePositionAdd}
            onPositionRemove={handlePositionRemove}
          />
        </MapContainer>
      </Box>
    </TaskWrapper>
  );
};

export default MapTask;
