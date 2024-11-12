// src/components/tasks/MapTask.tsx
import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TaskWrapper from "./TaskWrapper";

interface MapTaskProps {
  title: string;
  description: string;
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapTask: React.FC<MapTaskProps> = ({
  title,
  description,
  onLocationSelect,
}) => {
  const { t } = useTranslation();

  return (
    <TaskWrapper title={title} description={description}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        height="300px"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button colorScheme="teal" onClick={() => onLocationSelect(0, 0)}>
          {t("selectLocation")}
        </Button>
      </Box>
    </TaskWrapper>
  );
};

export default MapTask;
