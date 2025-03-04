import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ProfessorLoginForm from "./ProfessorLoginForm";

interface FormData {
  room_name: string;
  password: string;
}

interface ProfessorLoginTabsProps {
  formData: FormData;
  isLoading: boolean;
  onChange: (field: keyof FormData, value: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

const ProfessorLoginTabs: React.FC<ProfessorLoginTabsProps> = ({
  formData,
  isLoading,
  onChange,
  onCreateRoom,
  onJoinRoom,
}) => {
  const { t } = useTranslation();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" shadow="sm">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em" bg="teal.100" borderRadius="md" p={1}>
          <Tab
            _selected={{
              bg: "white",
              color: "teal.700",
              borderRadius: "md",
              fontWeight: "semibold",
              shadow: "sm",
            }}
            color="teal.700"
            borderRadius="md"
            transition="all 0.2s"
            _hover={{
              bg: "white",
            }}
          >
            {t("createRoom")}
          </Tab>
          <Tab
            _selected={{
              bg: "white",
              color: "teal.700",
              borderRadius: "md",
              fontWeight: "semibold",
              shadow: "sm",
            }}
            color="teal.700"
            borderRadius="md"
            transition="all 0.2s"
            _hover={{
              bg: "white",
            }}
          >
            {t("joinRoom")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <ProfessorLoginForm
              formData={formData}
              isLoading={isLoading}
              onSubmit={onCreateRoom}
              onChange={onChange}
              submitButtonText={t("createRoom")}
            />
          </TabPanel>
          <TabPanel p={0}>
            <ProfessorLoginForm
              formData={formData}
              isLoading={isLoading}
              onSubmit={onJoinRoom}
              onChange={onChange}
              submitButtonText={t("joinRoom")}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfessorLoginTabs;
