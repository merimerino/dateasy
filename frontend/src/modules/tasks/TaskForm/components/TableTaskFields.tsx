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
  columns: string;
  rows: number;
  errors: {
    columns?: string;
    rows?: string;
  };
  onChange: {
    columns: (columns: string) => void;
    rows: (value: number) => void;
  };
  isSubmitting: boolean;
}

const TableTaskFields: React.FC<TableTaskFieldsProps> = ({
  columns,
  rows,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  // Convert string to array, handling empty string case
  const getColumnsArray = (columnsStr: string) => {
    if (!columnsStr) return [];
    const cols = columnsStr.split(",").map((col) => col.trim());
    return cols.filter((col) => col !== undefined); // Keep empty strings but filter undefined
  };

  const handleAddHeader = () => {
    const currentColumns = getColumnsArray(columns);
    if (currentColumns.length === 0) {
      onChange.columns(" "); // Using space to ensure it's not an empty string
      return;
    }
    const newColumns = [...currentColumns, ""];
    onChange.columns(newColumns.join(","));
  };

  const handleRemoveHeader = (index: number) => {
    const currentColumns = getColumnsArray(columns);
    const newColumns = currentColumns.filter((_, i) => i !== index);
    onChange.columns(newColumns.join(","));
  };

  const handleHeaderChange = (index: number, value: string) => {
    const currentColumns = getColumnsArray(columns);
    const newColumns = currentColumns.map((header, i) =>
      i === index ? value : header
    );
    onChange.columns(newColumns.join(","));
  };

  // Get array for rendering, ensuring we show empty strings
  const columnArray = columns === "" ? [] : getColumnsArray(columns);

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

      <FormControl isInvalid={!!errors.columns}>
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
            {columnArray.map((header, index) => (
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
          {errors.columns && (
            <FormErrorMessage>{errors.columns}</FormErrorMessage>
          )}
        </Box>
      </FormControl>
    </VStack>
  );
};

export default TableTaskFields;
