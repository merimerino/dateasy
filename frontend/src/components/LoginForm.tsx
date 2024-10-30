import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  onSubmit: (roomName: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [roomName, setRoomName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(roomName, password);
  };

  return (
    <Container maxW="md" py={10}>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>{t("createRoom")}</Tab>
            <Tab>{t("joinRoom")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Input
                    placeholder={t("roomName")}
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button width="100%" colorScheme="teal" type="submit">
                    {t("createRoom")}
                  </Button>
                </VStack>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Input
                    placeholder={t("roomName")}
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button width="100%" colorScheme="teal" type="submit">
                    {t("joinRoom")}
                  </Button>
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LoginForm;
