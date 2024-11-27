import { useState } from "react";
import { NumberInput, NumberInputField, FormControl } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TaskWrapper from "../TaskWrapper";

interface NumbersTaskProps {
  title: string;
  description: string;
  min: number;
  max: number;
  onChange: (value: string) => void;
}

const NumbersTask: React.FC<NumbersTaskProps> = ({
  title,
  description,
  min,
  max,
  onChange,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleChange = (valueString: string) => {
    setValue(valueString);
    onChange(valueString);
  };

  return (
    <TaskWrapper title={title} description={description}>
      <FormControl>
        <NumberInput
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          size="lg"
        >
          <NumberInputField
            placeholder={`${t("numberBetween")} ${min} ${t("and")} ${max}`}
            borderColor="teal.200"
            _focus={{ borderColor: "teal.400" }}
          />
        </NumberInput>
      </FormControl>
    </TaskWrapper>
  );
};

export default NumbersTask;
