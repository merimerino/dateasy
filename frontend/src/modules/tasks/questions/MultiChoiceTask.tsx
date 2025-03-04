import { useState } from "react";
import { Radio, RadioGroup, Checkbox, VStack, Text } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";

interface MultiChoiceTaskProps {
  title: string;
  description: string;
  options?: string[];
  multiple_answers?: boolean;
  onChange: (value: string) => void;
}

const MultiChoiceTask: React.FC<MultiChoiceTaskProps> = ({
  title,
  description,
  options,
  multiple_answers,
  onChange,
}) => {
  const [singleValue, setSingleValue] = useState("");
  const [multipleValues, setMultipleValues] = useState<string>("");

  const handleSingleChange = (newValue: string) => {
    setSingleValue(newValue);
    onChange(newValue);
  };

  const handleMultipleChange = (option: string, isChecked: boolean) => {
    const currentValues = multipleValues ? multipleValues.split(",") : [];
    let updatedValues: string;

    if (isChecked) {
      updatedValues = currentValues.includes(option)
        ? multipleValues
        : [...currentValues, option].join(",");
    } else {
      updatedValues = currentValues
        .filter((value) => value !== option)
        .join(",");
    }

    setMultipleValues(updatedValues);
    onChange(updatedValues);
  };

  if (multiple_answers) {
    return (
      <TaskWrapper title={title} description={description}>
        <VStack align="stretch" spacing={3}>
          {options?.map((option, index) => (
            <Checkbox
              key={index}
              isChecked={multipleValues.split(",").includes(option)}
              onChange={(e) => handleMultipleChange(option, e.target.checked)}
              size="lg"
              colorScheme="teal"
              borderColor="teal.200"
            >
              <Text fontSize="md">{option}</Text>
            </Checkbox>
          ))}
        </VStack>
      </TaskWrapper>
    );
  }

  return (
    <TaskWrapper title={title} description={description}>
      <RadioGroup value={singleValue} onChange={handleSingleChange}>
        <VStack align="stretch" spacing={3}>
          {options?.map((option, index) => (
            <Radio
              key={index}
              value={option}
              size="lg"
              colorScheme="teal"
              borderColor="teal.200"
            >
              <Text fontSize="md">{option}</Text>
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </TaskWrapper>
  );
};

export default MultiChoiceTask;
