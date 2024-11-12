import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Create Room</Tab>
          <Tab>Join Room</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfessorLoginForm
              formData={formData}
              isLoading={isLoading}
              onSubmit={onCreateRoom}
              onChange={onChange}
              submitButtonText="Create Room"
            />
          </TabPanel>
          <TabPanel>
            <ProfessorLoginForm
              formData={formData}
              isLoading={isLoading}
              onSubmit={onJoinRoom}
              onChange={onChange}
              submitButtonText="Join Room"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfessorLoginTabs;
