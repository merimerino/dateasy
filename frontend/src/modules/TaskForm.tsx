import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  IconButton,
  Switch,
  InputGroup,
  InputRightElement,
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Task,
  MultipleChoiceTask,
  NumberTask,
  ShortTask,
  TableTask,
  MapTask,
} from "../types/Tasks";

// Props interface
interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: Task;
}

// Form data interface with all possible fields
interface TaskFormData {
  name: string;
  order_number?: number;
  room_name?: string;
  task_type: Task["task_type"];
  text: string;
  // Optional fields based on task type
  options?: string[];
  multiple_answers?: boolean;
  min_num?: number;
  max_num?: number;
  max_characters_allowed?: number;
  headers?: string[];
  rows?: number;
  columns?: number;
  center_latitude?: number;
  center_longitude?: number;
  zoom_level?: number;
  allow_multiple_points?: boolean;
}

// Validation interface
interface FormErrors {
  name?: string;
  text?: string;
  options?: string;
  headers?: string;
  min_num?: string;
  max_num?: string;
  max_characters_allowed?: string;
  rows?: string;
  columns?: string;
}

// Default values for different task types
const defaultValues: Record<Task["task_type"], Partial<TaskFormData>> = {
  multichoice: {
    options: [],
    multiple_answers: false,
  },
  numbers_task: {
    min_num: 0,
    max_num: 100,
  },
  short_task: {
    max_characters_allowed: 250,
  },
  table: {
    headers: [],
    rows: 3,
    columns: 3,
  },
  map: {
    center_latitude: 0,
    center_longitude: 0,
    zoom_level: 13,
    allow_multiple_points: false,
  },
  description: {},
};

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const toast = useToast();

  // Initialize form state
  const [formData, setFormData] = useState<TaskFormData>(() => ({
    task_type: initialData?.task_type || "short_task",
    name: initialData?.name || "",
    text: initialData?.text || "",
    room_name: initialData?.room_name || roomName || "",
    order_number: initialData?.order_number,
    ...defaultValues[initialData?.task_type || "short_task"],
    ...(initialData && getTypeSpecificFields(initialData)),
  }));

  // Initialize error state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get type-specific fields from initialData
  function getTypeSpecificFields(data: Task): Partial<TaskFormData> {
    switch (data.task_type) {
      case "multichoice":
        return {
          options: (data as MultipleChoiceTask).options,
          multiple_answers: (data as MultipleChoiceTask).multiple_answers,
        };
      case "numbers_task":
        return {
          min_num: (data as NumberTask).min_num,
          max_num: (data as NumberTask).max_num,
        };
      case "short_task":
        return {
          max_characters_allowed: (data as ShortTask).max_characters_allowed,
        };
      case "table":
        return {
          headers: (data as TableTask).headers,
          rows: (data as TableTask).rows,
          columns: (data as TableTask).columns,
        };
      case "map":
        return {
          center_latitude: (data as MapTask).center_latitude,
          center_longitude: (data as MapTask).center_longitude,
          zoom_level: (data as MapTask).zoom_level,
          allow_multiple_points: (data as MapTask).allow_multiple_points,
        };
      default:
        return {};
    }
  }

  // Form field handlers
  const handleTypeChange = useCallback((newType: Task["task_type"]) => {
    setFormData((prev) => ({
      ...prev,
      task_type: newType,
      ...defaultValues[newType],
    }));
    setErrors({});
  }, []);

  const handleInputChange = useCallback(
    <K extends keyof TaskFormData>(field: K, value: TaskFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  // Multiple choice handlers
  const handleAddOption = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  }, []);

  const handleRemoveOption = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: (prev.options || []).filter((_, i) => i !== index),
    }));
  }, []);

  const handleOptionChange = useCallback((index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: (prev.options || []).map((opt, i) =>
        i === index ? value : opt
      ),
    }));
  }, []);

  // Table handlers
  const handleAddHeader = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      headers: [...(prev.headers || []), ""],
    }));
  }, []);

  const handleRemoveHeader = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      headers: (prev.headers || []).filter((_, i) => i !== index),
    }));
  }, []);

  const handleHeaderChange = useCallback((index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      headers: (prev.headers || []).map((header, i) =>
        i === index ? value : header
      ),
    }));
  }, []);

  // Validation function
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("errors.nameRequired");
    }

    if (!formData.text.trim()) {
      newErrors.text = t("errors.textRequired");
    }

    switch (formData.task_type) {
      case "multichoice":
        if (!formData.options?.length || formData.options.length < 2) {
          newErrors.options = t("errors.minimumTwoOptions");
        }
        if (formData.options?.some((opt) => !opt.trim())) {
          newErrors.options = t("errors.emptyOptions");
        }
        break;

      case "numbers_task":
        if (formData.max_num! <= formData.min_num!) {
          newErrors.max_num = t("errors.maxGreaterThanMin");
        }
        break;

      case "table":
        if (!formData.headers?.length) {
          newErrors.headers = t("errors.headersRequired");
        }
        if (formData.headers?.some((header) => !header.trim())) {
          newErrors.headers = t("errors.emptyHeaders");
        }
        break;
    }

    return newErrors;
  }, [formData, t]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: t("errors.validationFailed"),
        status: "error",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url =
        mode === "create"
          ? `http://localhost:3000/tasks`
          : `http://localhost:3000/tasks/${formData.order_number}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          ...formData,
          room_name: roomName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save task");
      }

      toast({
        title: t("taskSaved"),
        status: "success",
        duration: 3000,
      });

      navigate(`/room/${roomName}/edit`);
    } catch (error) {
      toast({
        title: t("errorSavingTask"),
        status: "error",
        duration: 5000,
      });
      console.error("Error saving task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = useCallback(() => {
    navigate(`/room/${roomName}/edit`);
  }, [navigate, roomName]);

  // Continue from previous implementation...

  return (
    <Box maxW="800px" mx="auto" py={8} px={4}>
      <Card as="form" onSubmit={handleSubmit}>
        <CardHeader>
          <Heading size="lg" color="teal.600">
            {mode === "create" ? t("createTask") : t("editTask")}
          </Heading>
        </CardHeader>

        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Task Type Selection */}
            <FormControl isRequired>
              <FormLabel>{t("taskType")}</FormLabel>
              <Select
                value={formData.task_type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as Task["task_type"])
                }
                size="lg"
                bg="white"
                isDisabled={isSubmitting}
              >
                <option value="short_task">{t("taskTypes.short_task")}</option>
                <option value="multichoice">
                  {t("taskTypes.multichoice")}
                </option>
                <option value="numbers_task">
                  {t("taskTypes.numbers_task")}
                </option>
                <option value="description">
                  {t("taskTypes.description")}
                </option>
                <option value="table">{t("taskTypes.table")}</option>
                <option value="map">{t("taskTypes.map")}</option>
              </Select>
            </FormControl>

            {/* Task Name */}
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>{t("taskName")}</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                size="lg"
                bg="white"
                isDisabled={isSubmitting}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            {/* Task Description */}
            <FormControl isRequired isInvalid={!!errors.text}>
              <FormLabel>{t("taskText")}</FormLabel>
              <Textarea
                value={formData.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                size="lg"
                bg="white"
                minH="100px"
                isDisabled={isSubmitting}
              />
              <FormErrorMessage>{errors.text}</FormErrorMessage>
            </FormControl>

            <Divider />

            {/* Type-specific fields */}
            {formData.task_type === "short_task" && (
              <FormControl isInvalid={!!errors.max_characters_allowed}>
                <FormLabel>{t("maxCharacters")}</FormLabel>
                <NumberInput
                  value={formData.max_characters_allowed}
                  onChange={(_, value) =>
                    handleInputChange("max_characters_allowed", value)
                  }
                  min={1}
                  size="lg"
                  isDisabled={isSubmitting}
                >
                  <NumberInputField bg="white" />
                </NumberInput>
                <FormErrorMessage>
                  {errors.max_characters_allowed}
                </FormErrorMessage>
              </FormControl>
            )}

            {formData.task_type === "numbers_task" && (
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.min_num}>
                  <FormLabel>{t("minNumber")}</FormLabel>
                  <NumberInput
                    value={formData.min_num}
                    onChange={(_, value) => handleInputChange("min_num", value)}
                    size="lg"
                    isDisabled={isSubmitting}
                  >
                    <NumberInputField bg="white" />
                  </NumberInput>
                  <FormErrorMessage>{errors.min_num}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.max_num}>
                  <FormLabel>{t("maxNumber")}</FormLabel>
                  <NumberInput
                    value={formData.max_num}
                    onChange={(_, value) => handleInputChange("max_num", value)}
                    size="lg"
                    isDisabled={isSubmitting}
                  >
                    <NumberInputField bg="white" />
                  </NumberInput>
                  <FormErrorMessage>{errors.max_num}</FormErrorMessage>
                </FormControl>
              </VStack>
            )}

            {formData.task_type === "multichoice" && (
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">{t("multipleAnswers")}</FormLabel>
                  <Switch
                    isChecked={formData.multiple_answers}
                    onChange={(e) =>
                      handleInputChange("multiple_answers", e.target.checked)
                    }
                    colorScheme="teal"
                    isDisabled={isSubmitting}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.options}>
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
                      {(formData.options || []).map((option, index) => (
                        <InputGroup key={index} size="lg">
                          <Input
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
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
                    <FormErrorMessage>{errors.options}</FormErrorMessage>
                  </Box>
                </FormControl>
              </VStack>
            )}

            {formData.task_type === "table" && (
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!errors.rows}>
                  <FormLabel>{t("numberOfRows")}</FormLabel>
                  <NumberInput
                    value={formData.rows}
                    onChange={(_, value) => handleInputChange("rows", value)}
                    min={1}
                    size="lg"
                    isDisabled={isSubmitting}
                  >
                    <NumberInputField bg="white" />
                  </NumberInput>
                  <FormErrorMessage>{errors.rows}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.headers}>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <FormLabel mb="0">{t("tableHeaders")}</FormLabel>
                      <Button
                        leftIcon={<AddIcon />}
                        size="sm"
                        onClick={handleAddHeader}
                        colorScheme="teal"
                        variant="ghost"
                        isDisabled={isSubmitting}
                      >
                        {t("addHeader")}
                      </Button>
                    </HStack>
                    <VStack spacing={2} align="stretch">
                      {(formData.headers || []).map((header, index) => (
                        <InputGroup key={index} size="lg">
                          <Input
                            value={header}
                            onChange={(e) =>
                              handleHeaderChange(index, e.target.value)
                            }
                            placeholder={`${t("header")} ${index + 1}`}
                            bg="white"
                            isDisabled={isSubmitting}
                          />
                          <InputRightElement>
                            <IconButton
                              icon={<DeleteIcon />}
                              size="sm"
                              aria-label={t("removeHeader")}
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleRemoveHeader(index)}
                              isDisabled={isSubmitting}
                            />
                          </InputRightElement>
                        </InputGroup>
                      ))}
                    </VStack>
                    <FormErrorMessage>{errors.headers}</FormErrorMessage>
                  </Box>
                </FormControl>
              </VStack>
            )}

            {formData.task_type === "map" && (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>{t("defaultZoom")}</FormLabel>
                  <NumberInput
                    value={formData.zoom_level}
                    onChange={(_, value) =>
                      handleInputChange("zoom_level", value)
                    }
                    min={1}
                    max={20}
                    size="lg"
                    isDisabled={isSubmitting}
                  >
                    <NumberInputField bg="white" />
                  </NumberInput>
                </FormControl>
                <HStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>{t("defaultLatitude")}</FormLabel>
                    <NumberInput
                      value={formData.center_latitude}
                      onChange={(_, value) =>
                        handleInputChange("center_latitude", value)
                      }
                      size="lg"
                      isDisabled={isSubmitting}
                    >
                      <NumberInputField bg="white" />
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>{t("defaultLongitude")}</FormLabel>
                    <NumberInput
                      value={formData.center_longitude}
                      onChange={(_, value) =>
                        handleInputChange("center_longitude", value)
                      }
                      size="lg"
                      isDisabled={isSubmitting}
                    >
                      <NumberInputField bg="white" />
                    </NumberInput>
                  </FormControl>
                </HStack>
              </VStack>
            )}
          </VStack>
        </CardBody>

        <CardFooter>
          <HStack spacing={4} justify="flex-end" w="100%">
            <Button onClick={handleCancel} size="lg" isDisabled={isSubmitting}>
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              isLoading={isSubmitting}
              loadingText={t("saving")}
            >
              {mode === "create" ? t("createTask") : t("saveChanges")}
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default TaskForm;
