import { useState } from "react";
import { Input, FormControl, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TaskWrapper from "../TaskWrapper";

interface ShortTextTaskProps {
  title: string;
  description: string;
  maxLength: number;
  onChange: (value: string) => void;
}

const ShortTextTask: React.FC<ShortTextTaskProps> = ({
  title,
  description,
  maxLength,
  onChange,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <TaskWrapper title={title} description={description}>
      <FormControl>
        <Input
          value={value}
          onChange={handleChange}
          placeholder={t("enterText")}
          maxLength={maxLength}
          size="lg"
          borderColor="teal.200"
          _focus={{ borderColor: "teal.400" }}
        />
        <Text fontSize="sm" color="teal.500" mt={1}>
          {value.length}/{maxLength} {t("characters")}
        </Text>
      </FormControl>
    </TaskWrapper>
  );
};

export default ShortTextTask;
