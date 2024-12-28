import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

interface MapAnswer {
  username: string;
  answer: string; // Format: "lat1,lng1;lat2,lng2"
}

interface MapTaskAnswersProps {
  answers: MapAnswer[] | null;
  initialCenter?: { lat: number; lng: number };
}

interface Coordinate {
  lat: number;
  lng: number;
}

// Predefined colors for users
const userColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEEAD", // Yellow
  "#D4A5A5", // Pink
  "#9B59B6", // Purple
  "#3498DB", // Light Blue
  "#E67E22", // Orange
  "#1ABC9C", // Turquoise
];

const getUserColor = (index: number): string => {
  return userColors[index % userColors.length];
};

// Create colored icon for a user
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const defaultCenter = { lat: 45.815399, lng: 15.966568 }; // Zagreb coordinates

// Helper function to parse coordinates string
const parseCoordinates = (coordsString: string): Coordinate[] => {
  if (!coordsString) return [];

  return coordsString.split(";").map((coord) => {
    const [lat, lng] = coord.split(",").map(Number);
    return { lat, lng };
  });
};

const MapTaskAnswers: React.FC<MapTaskAnswersProps> = ({
  answers = null,
  initialCenter = defaultCenter,
}) => {
  const { t } = useTranslation();
  const mapRef = React.useRef<L.Map | null>(null);
  const markerClusterRef = React.useRef<L.MarkerClusterGroup | null>(null);

  const center = React.useMemo(() => {
    if (!answers || !answers.length) return initialCenter;

    let totalLat = 0;
    let totalLng = 0;
    let count = 0;

    answers.forEach((answer) => {
      const coordinates = parseCoordinates(answer.answer);
      coordinates.forEach((coord) => {
        totalLat += coord.lat;
        totalLng += coord.lng;
        count++;
      });
    });

    return count > 0
      ? { lat: totalLat / count, lng: totalLng / count }
      : initialCenter;
  }, [answers, initialCenter]);

  React.useEffect(() => {
    if (!answers || !answers.length || !mapRef.current) return;

    if (markerClusterRef.current) {
      markerClusterRef.current.remove();
    }

    const markerCluster = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        return L.divIcon({
          html: `<div style="
            background-color: #666;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.4);
          ">${cluster.getChildCount()}</div>`,
          className: "marker-cluster",
          iconSize: L.point(30, 30),
        });
      },
    });
    markerClusterRef.current = markerCluster;

    answers.forEach((answer, userIndex) => {
      const coordinates = parseCoordinates(answer.answer);
      const userColor = getUserColor(userIndex);
      const icon = createColoredIcon(userColor);

      coordinates.forEach((coord, coordIndex) => {
        const marker = L.marker([coord.lat, coord.lng], { icon }).bindPopup(`
            <div style="border-left: 4px solid ${userColor}; padding-left: 8px;">
              <b>${answer.username}</b><br/>
              ${t("coordinate")}: ${coordIndex + 1}<br/>
              ${t("latitude")}: ${coord.lat.toFixed(6)}<br/>
              ${t("longitude")}: ${coord.lng.toFixed(6)}
            </div>
          `);
        markerCluster.addLayer(marker);
      });
    });

    mapRef.current.addLayer(markerCluster);

    return () => {
      markerCluster.remove();
    };
  }, [answers, t]);

  const hasAnswers = answers && answers.length > 0;

  return (
    <VStack spacing={4} align="stretch">
      {hasAnswers && (
        <Heading size="sm">
          {t("answerLocations", { count: answers.length })}
        </Heading>
      )}

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

      {hasAnswers && (
        <Box maxH="200px" overflowY="auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>{t("user")}</th>
                <th>{t("coordinates")}</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer, userIndex) => {
                const coordinates = parseCoordinates(answer.answer);
                const userColor = getUserColor(userIndex);
                return (
                  <tr key={`${answer.username}-${userIndex}`}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: userColor,
                          }}
                        />
                        {answer.username}
                      </div>
                    </td>
                    <td>
                      {coordinates.map((coord, coordIndex) => (
                        <div key={coordIndex}>
                          {coordIndex + 1}: ({coord.lat.toFixed(6)},{" "}
                          {coord.lng.toFixed(6)})
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
    </VStack>
  );
};

export default MapTaskAnswers;
