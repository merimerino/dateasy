import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface NumberTaskFieldsProps {
  minNum: number | undefined;
  maxNum: number | undefined;
  errors: {
    min_num?: string;
    max_num?: string;
  };
  onChange: {
    min_num: (value: number) => void;
    max_num: (value: number) => void;
  };
  isSubmitting: boolean;
}

const NumberTaskFields: React.FC<NumberTaskFieldsProps> = ({
  minNum,
  maxNum,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <VStack spacing={4}>
      <FormControl isInvalid={!!errors.min_num}>
        <FormLabel>{t("minNumber")}</FormLabel>
        <NumberInput
          value={minNum}
          onChange={(_, value) => onChange.min_num(value)}
          size="lg"
          isDisabled={isSubmitting}
        >
          <NumberInputField bg="white" />
        </NumberInput>
        {errors.min_num && (
          <FormErrorMessage>{errors.min_num}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.max_num}>
        <FormLabel>{t("maxNumber")}</FormLabel>
        <NumberInput
          value={maxNum}
          onChange={(_, value) => onChange.max_num(value)}
          size="lg"
          isDisabled={isSubmitting}
        >
          <NumberInputField bg="white" />
        </NumberInput>
        {errors.max_num && (
          <FormErrorMessage>{errors.max_num}</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default NumberTaskFields;
