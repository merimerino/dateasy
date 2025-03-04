import {
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FormErrors } from "../types";

interface DescriptionTaskFieldsProps {
  description: string;
  errors: Pick<FormErrors, "text">;
  onChange: (field: "text", value: string) => void;
  isSubmitting: boolean;
}

const DescriptionTaskFields: React.FC<DescriptionTaskFieldsProps> = ({
  description,
  errors,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <VStack spacing={6} align="stretch">
      <FormControl isRequired isInvalid={!!errors.text}>
        <FormLabel>{t("taskDescription")}</FormLabel>
        <Textarea
          value={description}
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

export default DescriptionTaskFields;
