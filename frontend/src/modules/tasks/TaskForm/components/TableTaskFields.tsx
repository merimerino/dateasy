import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button,
  Box,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

interface TableTaskFieldsProps {
  headers: string[];
  rows: number;
  errors: {
    headers?: string;
    rows?: string;
  };
  onChange: {
    headers: (headers: string[]) => void;
    rows: (value: number) => void;
  };
  isSubmitting: boolean;
}

const TableTaskFields: React.FC<TableTaskFieldsProps> = ({
  headers,
  rows,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  const handleAddHeader = () => {
    onChange.headers([...headers, ""]);
  };

  const handleRemoveHeader = (index: number) => {
    onChange.headers(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index: number, value: string) => {
    onChange.headers(
      headers.map((header, i) => (i === index ? value : header))
    );
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.rows}>
        <FormLabel>{t("numberOfRows")}</FormLabel>
        <NumberInput
          value={rows}
          onChange={(_, value) => onChange.rows(value)}
          min={1}
          size="lg"
          isDisabled={isSubmitting}
        >
          <NumberInputField bg="white" />
        </NumberInput>
        {errors.rows && <FormErrorMessage>{errors.rows}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!!errors.headers}>
        <Box>
          <HStack justify="space-between" mb={2}>
            <FormLabel mb="0">{t("tableHeaders")}</FormLabel>
            <Button
              leftIcon={<AddIcon />}
              size="sm"
              onClick={handleAddHeader}
              colorScheme="teal"
              variant="ghost"
              isDisabled={isSubmitting}
            >
              {t("addHeader")}
            </Button>
          </HStack>
          <VStack spacing={2} align="stretch">
            {headers.map((header, index) => (
              <InputGroup key={index} size="lg">
                <Input
                  value={header}
                  onChange={(e) => handleHeaderChange(index, e.target.value)}
                  placeholder={`${t("header")} ${index + 1}`}
                  bg="white"
                  isDisabled={isSubmitting}
                />
                <InputRightElement>
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    aria-label={t("removeHeader")}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleRemoveHeader(index)}
                    isDisabled={isSubmitting}
                  />
                </InputRightElement>
              </InputGroup>
            ))}
          </VStack>
          {errors.headers && (
            <FormErrorMessage>{errors.headers}</FormErrorMessage>
          )}
        </Box>
      </FormControl>
    </VStack>
  );
};

export default TableTaskFields;
