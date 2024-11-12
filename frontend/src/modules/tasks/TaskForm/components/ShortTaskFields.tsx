import React from "react";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ShortTaskFieldsProps {
  maxCharacters: number | undefined;
  error?: string;
  onChange: (value: number) => void;
  isSubmitting: boolean;
}

const ShortTaskFields: React.FC<ShortTaskFieldsProps> = ({
  maxCharacters,
  error,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{t("maxCharacters")}</FormLabel>
      <NumberInput
        value={maxCharacters}
        onChange={(_, value) => onChange(value)}
        min={1}
        size="lg"
        isDisabled={isSubmitting}
      >
        <NumberInputField bg="white" />
      </NumberInput>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ShortTaskFields;
