import { useState } from "react";
import { FormControl, Input, Text, Box, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FileUp, FileCheck } from "lucide-react";
import TaskWrapper from "../TaskWrapper";

interface GpxTaskProps {
  title: string;
  description: string;
  onChange: (value: string) => void;
}

const GpxTask: React.FC<GpxTaskProps> = ({ title, description, onChange }) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".gpx")) {
      return;
    }

    setSelectedFile(file);
    // Convert file to base64 string for submission
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      onChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <TaskWrapper title={title} description={description}>
      <FormControl>
        <Box
          border="2px dashed"
          borderColor="teal.200"
          borderRadius="md"
          p={6}
          _hover={{ borderColor: "teal.400" }}
          transition="all 0.2s"
        >
          <Input
            type="file"
            accept=".gpx"
            onChange={handleFileChange}
            hidden
            id="gpx-file-input"
          />
          <label htmlFor="gpx-file-input">
            <VStack spacing={3} cursor="pointer">
              {selectedFile ? (
                <FileCheck color="#319795" size={24} /> // teal.500 color
              ) : (
                <FileUp color="#4FD1C5" size={24} /> // teal.300 color
              )}
              <Text color={selectedFile ? "teal.500" : "gray.500"}>
                {selectedFile ? selectedFile.name : t("uploadGpxFile")}
              </Text>
            </VStack>
          </label>
        </Box>
      </FormControl>
    </TaskWrapper>
  );
};

export default GpxTask;
