import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Switch,
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

interface MultiChoiceFieldsProps {
  options: string[];
  multipleAnswers: boolean;
  error?: string;
  onChange: {
    options: (options: string[]) => void;
    multipleAnswers: (value: boolean) => void;
  };
  isSubmitting: boolean;
}

const MultiChoiceFields: React.FC<MultiChoiceFieldsProps> = ({
  options,
  multipleAnswers,
  error,
  onChange,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  const handleAddOption = () => {
    onChange.options([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    onChange.options(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    onChange.options(options.map((opt, i) => (i === index ? value : opt)));
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">{t("multipleAnswers")}</FormLabel>
        <Switch
          isChecked={multipleAnswers}
          onChange={(e) => onChange.multipleAnswers(e.target.checked)}
          colorScheme="teal"
          isDisabled={isSubmitting}
        />
      </FormControl>

      <FormControl isInvalid={!!error}>
        <Box>
          <HStack justify="space-between" mb={2}>
            <FormLabel mb="0">{t("options")}</FormLabel>
            <Button
              leftIcon={<AddIcon />}
              size="sm"
              onClick={handleAddOption}
              colorScheme="teal"
              variant="ghost"
              isDisabled={isSubmitting}
            >
              {t("addOption")}
            </Button>
          </HStack>
          <VStack spacing={2} align="stretch">
            {options.map((option, index) => (
              <InputGroup key={index} size="lg">
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`${t("option")} ${index + 1}`}
                  bg="white"
                  isDisabled={isSubmitting}
                />
                <InputRightElement>
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    aria-label={t("removeOption")}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleRemoveOption(index)}
                    isDisabled={isSubmitting}
                  />
                </InputRightElement>
              </InputGroup>
            ))}
          </VStack>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </Box>
      </FormControl>
    </VStack>
  );
};

export default MultiChoiceFields;
