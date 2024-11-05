import {
  Box,
  VStack,
  Text,
  Input,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "../../types/Tasks";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const renderTaskInput = () => {
    switch (task.taskType) {
      case "short_tasks":
        return (
          <FormControl>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("enterText")}
              maxLength={task.max_characters_allowed}
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              {value.length}/{task.max_characters_allowed} {t("characters")}
            </Text>
          </FormControl>
        );

      case "multiple_choice":
        return (
          <RadioGroup value={value} onChange={setValue}>
            <VStack align="stretch" spacing={2}>
              {task.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        );

      case "number_tasks":
        return (
          <FormControl>
            <NumberInput
              min={task.min_num}
              max={task.max_num}
              value={numberValue}
              onChange={(valueString) => setNumberValue(valueString)}
            >
              <NumberInputField
                placeholder={`${t("numberBetween")} ${task.min_num} ${t(
                  "and"
                )} ${task.max_num}`}
              />
            </NumberInput>
          </FormControl>
        );
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" shadow="sm">
      <VStack align="stretch" spacing={3}>
        <Text fontWeight="bold" fontSize="lg">
          {task.name}
        </Text>
        <Text color="gray.600" fontSize="md">
          {task.text}
        </Text>
        {renderTaskInput()}
      </VStack>
    </Box>
  );
};

export default TaskCard;
