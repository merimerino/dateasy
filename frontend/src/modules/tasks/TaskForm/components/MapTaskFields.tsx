import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface MapTaskFieldsProps {
  centerLatitude: number | undefined;
  centerLongitude: number | undefined;
  zoomLevel: number | undefined;
  errors: {
    center_latitude?: string;
    center_longitude?: string;
    zoom_level?: string;
  };
  onChange: {
    centerLatitude: (value: number) => void;
    centerLongitude: (value: number) => void;
    zoomLevel: (value: number) => void;
  };
  isSubmitting: boolean;
}

const MapTaskFields: React.FC<MapTaskFieldsProps> = ({
  centerLatitude,
  centerLongitude,
  zoomLevel,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <VStack spacing={4}>
      <FormControl isInvalid={!!errors.zoom_level}>
        <FormLabel>{t("defaultZoom")}</FormLabel>
        <NumberInput
          value={zoomLevel}
          onChange={(_, value) => onChange.zoomLevel(value)}
          min={1}
          max={20}
          size="lg"
          isDisabled={isSubmitting}
        >
          <NumberInputField bg="white" />
        </NumberInput>
        {errors.zoom_level && (
          <FormErrorMessage>{errors.zoom_level}</FormErrorMessage>
        )}
      </FormControl>

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
