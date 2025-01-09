import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FormErrors } from "../types";

interface BasicTaskFieldsProps {
  name: string;
  text: string;
  errors: Pick<FormErrors, "name" | "text">;
  onChange: <K extends "name" | "text">(field: K, value: string) => void;
  isSubmitting: boolean;
}

const BasicTaskFields: React.FC<BasicTaskFieldsProps> = ({
  name,
  text,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  console.log("HEJ dobio sam");
  console.log(name);
  console.log(text);
  return (
    <VStack spacing={6} align="stretch">
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormLabel>{t("taskName")}</FormLabel>
        <Input
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          size="lg"
          bg="white"
          isDisabled={isSubmitting}
        />
        {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.text}>
        <FormLabel>{t("taskText")}</FormLabel>
        <Textarea
          value={text}
          onChange={(e) => onChange("text", e.target.value)}
          size="lg"
          bg="white"
          minH="100px"
          isDisabled={isSubmitting}
        />
        {errors.text && <FormErrorMessage>{errors.text}</FormErrorMessage>}
      </FormControl>
    </VStack>
  );
};

export default BasicTaskFields;
