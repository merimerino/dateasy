import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { GenericAnswer } from "../TaskForm/types";
import { useAnonymity } from "../../../contexts/AnonimityProvider";

interface GpxTaskAnswersProps {
  answers: GenericAnswer[] | null;
  initialCenter?: { lat: number; lng: number };
}

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

const defaultCenter = { lat: 45.815399, lng: 15.966568 };

const formatGpxString = (gpxString: string): string => {
  const base64Data = gpxString.replace("data:application/gpx+xml;base64,", "");
  return base64Data;
};

const parseGpxToCoordinates = (gpxString: string): Array<[number, number]> => {
  const parser = new DOMParser();
  const formattedGpx = formatGpxString(gpxString);
  const decoded = atob(formattedGpx);
  const gpx = parser.parseFromString(decoded, "text/xml");

  const trackpoints = gpx.getElementsByTagName("trkpt");
  const waypoints = gpx.getElementsByTagName("wpt");

  const points = trackpoints.length > 0 ? trackpoints : waypoints;

  const coordinates: Array<[number, number]> = [];
  for (const point of points) {
    const lat = parseFloat(point.getAttribute("lat") || "0");
    const lon = parseFloat(point.getAttribute("lon") || "0");
    if (lat && lon) {
      coordinates.push([lat, lon]);
    }
  }

  return coordinates;
};

const TrackLayer: React.FC<{
  answers: GenericAnswer[];
  isAnonymous: boolean;
}> = ({ answers, isAnonymous }) => {
  const { t } = useTranslation();
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const trackLayers: L.Polyline[] = [];

    answers.forEach((answer, userIndex) => {
      try {
        if (!answer.answer) {
          return;
        }

        const coordinates = parseGpxToCoordinates(answer.answer);
        const userColor = getUserColor(userIndex);

        const validCoordinates = coordinates.every(([lat, lon]) => {
          const isValid =
            !isNaN(lat) &&
            !isNaN(lon) &&
            lat >= -90 &&
            lat <= 90 &&
            lon >= -180 &&
            lon <= 180;
          if (!isValid) {
            console.error("Invalid coordinate:", lat, lon);
          }
          return isValid;
        });

        if (coordinates.length > 0 && validCoordinates) {
          const track = L.polyline(coordinates, {
            color: userColor,
            weight: 3,
            opacity: 0.8,
          });

          const distance = coordinates.reduce((total, coord, i) => {
            if (i === 0) return 0;
            return total + map.distance(coordinates[i - 1], coord);
          }, 0);

          const popupContent = isAnonymous
            ? `
              <div style="border-left: 4px solid ${userColor}; padding-left: 8px;">
                <b>${t("track")} ${userIndex + 1}</b><br/>
                ${t("distance")}: ${(distance / 1000).toFixed(2)} km<br/>
                ${t("points")}: ${coordinates.length}
              </div>
            `
            : `
              <div style="border-left: 4px solid ${userColor}; padding-left: 8px;">
                <b>${answer.username}</b><br/>
                ${t("distance")}: ${(distance / 1000).toFixed(2)} km<br/>
                ${t("points")}: ${coordinates.length}<br/>
              </div>
            `;

          track.bindPopup(popupContent);
          track.addTo(map);
          trackLayers.push(track);

          if (trackLayers.length === 1) {
            map.fitBounds(track.getBounds());
          }
        }
      } catch (error) {
        console.error("Error parsing GPX track:", error);
      }
    });

    if (trackLayers.length > 1) {
      const group = L.featureGroup(trackLayers);
      map.fitBounds(group.getBounds());
    }

    return () => {
      trackLayers.forEach((layer) => layer.remove());
    };
  }, [map, answers, isAnonymous, t]);

  return null;
};

const GpxTaskAnswers: React.FC<GpxTaskAnswersProps> = ({
  answers = null,
  initialCenter = defaultCenter,
}) => {
  const { t } = useTranslation();
  const { isAnonymous } = useAnonymity();

  const hasAnswers = answers && answers.length > 0;

  if (!hasAnswers) {
    return (
      <Box textAlign="center" py={8}>
        <Heading size="sm" color="gray.500">
          {t("noAnswersYet")}
        </Heading>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <Box h="500px" position="relative" borderRadius="lg" overflow="hidden">
        <MapContainer
          center={[initialCenter.lat, initialCenter.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hasAnswers && (
            <TrackLayer answers={answers} isAnonymous={isAnonymous} />
          )}
        </MapContainer>
      </Box>
    </VStack>
  );
};

export default GpxTaskAnswers;
