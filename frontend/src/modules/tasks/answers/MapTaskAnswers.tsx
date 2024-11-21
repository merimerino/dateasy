import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { MapAnswer } from "../../../types/Tasks";

interface MapTaskAnswersProps {
  answers: MapAnswer[];
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

const MapTaskAnswers: React.FC<MapTaskAnswersProps> = ({ answers }) => {
  const { t } = useTranslation();

  const center = answers.reduce(
    (acc, answer) => {
      acc.lat += answer.answer.latitude;
      acc.lng += answer.answer.longitude;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  center.lat /= answers.length || 1;
  center.lng /= answers.length || 1;

  const mapRef = React.useRef<L.Map | null>(null);
  const markerClusterRef = React.useRef<L.MarkerClusterGroup | null>(null);

  React.useEffect(() => {
    if (mapRef.current) {
      if (markerClusterRef.current) {
        markerClusterRef.current.remove();
      }

      const markerCluster = L.markerClusterGroup();
      markerClusterRef.current = markerCluster;

      answers.forEach((answer) => {
        const marker = L.marker([
          answer.answer.latitude,
          answer.answer.longitude,
        ]).bindPopup(`
          <b>${answer.username}</b><br/>
          ${t("latitude")}: ${answer.answer.latitude.toFixed(6)}<br/>
          ${t("longitude")}: ${answer.answer.longitude.toFixed(6)}
        `);
        markerCluster.addLayer(marker);
      });

      mapRef.current.addLayer(markerCluster);
    }
  }, [answers, t]);

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="sm">
        {t("answerLocations", { count: answers.length })}
      </Heading>

      <Box h="500px" position="relative" borderRadius="lg" overflow="hidden">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Box>

      <Box maxH="200px" overflowY="auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>{t("user")}</th>
              <th>{t("latitude")}</th>
              <th>{t("longitude")}</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr key={`${answer.username}-${index}`}>
                <td>{answer.username}</td>
                <td>{answer.answer.latitude.toFixed(6)}</td>
                <td>{answer.answer.longitude.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </VStack>
  );
};

export default MapTaskAnswers;
