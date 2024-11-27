import { useState } from "react";
import { Radio, RadioGroup, VStack, Text } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";

interface MultiChoiceTaskProps {
  title: string;
  description: string;
  options: string[];
  onChange: (value: string) => void;
}

const MultiChoiceTask: React.FC<MultiChoiceTaskProps> = ({
  title,
  description,
  options,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <TaskWrapper title={title} description={description}>
      <RadioGroup value={value} onChange={handleChange}>
        <VStack align="stretch" spacing={3}>
          {options.map((option, index) => (
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
