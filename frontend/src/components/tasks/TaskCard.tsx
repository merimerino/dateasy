// components/TaskCard.tsx
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

  // Add safety check at the component level
  if (!task) {
    return null;
  }

  const renderTaskInput = () => {
    switch (task.task_type) {
      case "short_task":
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

      case "multichoice":
        return task.options ? (
          <RadioGroup value={value} onChange={setValue}>
            <VStack align="stretch" spacing={2}>
              {task.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        ) : null;

      case "numbers_task":
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

      default:
        return null;
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
