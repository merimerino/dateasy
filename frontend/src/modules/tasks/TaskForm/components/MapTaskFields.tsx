import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  HStack,
  Box,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useTranslation } from "react-i18next";

interface MapTaskFieldsProps {
  centerLatitude: number | undefined;
  centerLongitude: number | undefined;
  errors: {
    center_latitude?: string;
    center_longitude?: string;
  };
  onChange: {
    centerLatitude: (value: number) => void;
    centerLongitude: (value: number) => void;
  };
  isSubmitting: boolean;
}

const MapClickHandler: React.FC<{
  onPositionSelect: (lat: number, lng: number) => void;
}> = ({ onPositionSelect }) => {
  useMapEvents({
    click: (e) => {
      onPositionSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapTaskFields: React.FC<MapTaskFieldsProps> = ({
  centerLatitude,
  centerLongitude,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  const handleMapClick = (lat: number, lng: number) => {
    onChange.centerLatitude(lat);
    onChange.centerLongitude(lng);
  };

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <Box height="400px" width="100%" borderRadius="lg" overflow="hidden">
        <MapContainer
          center={[centerLatitude || 45.815399, centerLongitude || 15.966568]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {centerLatitude && centerLongitude && (
            <Marker position={[centerLatitude, centerLongitude]} />
          )}
          <MapClickHandler onPositionSelect={handleMapClick} />
        </MapContainer>
      </Box>

      <HStack spacing={4} align="start">
        <FormControl isInvalid={!!errors.center_latitude}>
          <FormLabel>{t("defaultLatitude")}</FormLabel>
          <NumberInput
            value={centerLatitude}
            onChange={(_, value) => onChange.centerLatitude(value)}
            min={-90}
            max={90}
            size="lg"
            isDisabled={isSubmitting}
          >
            <NumberInputField bg="white" />
          </NumberInput>
          {errors.center_latitude && (
            <FormErrorMessage>{errors.center_latitude}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.center_longitude}>
          <FormLabel>{t("defaultLongitude")}</FormLabel>
          <NumberInput
            value={centerLongitude}
            onChange={(_, value) => onChange.centerLongitude(value)}
            min={-180}
            max={180}
            size="lg"
            isDisabled={isSubmitting}
          >
            <NumberInputField bg="white" />
          </NumberInput>
          {errors.center_longitude && (
            <FormErrorMessage>{errors.center_longitude}</FormErrorMessage>
          )}
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default MapTaskFields;
