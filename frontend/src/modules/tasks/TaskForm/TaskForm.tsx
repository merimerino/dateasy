import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Button,
  VStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FormErrors, ExtendedTask, TaskType } from "./types";

import TaskTypeSelect from "./components/TaskTypeSelect";
import BasicTaskFields from "./components/BasicTaskFields";
import ShortTaskFields from "./components/ShortTaskFields";
import NumberTaskFields from "./components/NumberTaskFields";
import MultiChoiceFields from "./components/MultiChoiceFields";
import TableTaskFields from "./components/TableTaskFields";
import MapTaskFields from "./components/MapTaskFields";
import DescriptionTaskFields from "./components/DescriptionTaskFields";

interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: ExtendedTask;
}

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const getInitialState = (): ExtendedTask => {
    const baseState: ExtendedTask = {
      id: initialData?.id || "",
      name: initialData?.name || "",
      text: initialData?.text || "",
      task_type: initialData?.task_type || "short_task",
      room_name: roomName || "",
      order_number: initialData?.order_number || 0,
      answers: [],
      max_characters_allowed: 0,
      min_num: 0,
      max_num: 0,
      options: [],
      multiple_answers: false,
      columns: "",
      rows: 0,
      show_graf: false,
      allow_adding_of_rows: false,
      new_row_name: "",
      center_latitude: 0,
      center_longitude: 0,
      zoom_level: 0,
      allow_multiple_points: false,
      coord_x: 0,
      coord_y: 0,
      add_mark: false,
    };

    if (initialData) {
      return {
        ...baseState,
        ...initialData,
      };
    }

    return baseState;
  };

  const [task, setTask] = useState<ExtendedTask>(getInitialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleInputChange = <K extends keyof ExtendedTask>(
    field: K,
    value: ExtendedTask[K]
  ) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleTypeChange = (newType: TaskType) => {
    setTask((prev) => ({
      ...getInitialState(),
      id: prev.id,
      name: prev.name,
      text: prev.text,
      task_type: newType,
      room_name: prev.room_name,
      order_number: prev.order_number,
    }));
    setErrors({});
  };

  const formatPayload = (data: ExtendedTask): ExtendedTask => {
    const basePayload = {
      id: data.id,
      name: data.name,
      text: data.text,
      room_name: roomName || "",
      order_number: data.order_number,
      task_type: data.task_type,
      answers: [],
      max_characters_allowed: 0,
      min_num: 0,
      max_num: 0,
      options: [],
      multiple_answers: false,
      columns: "",
      rows: 0,
      show_graf: false,
      allow_adding_of_rows: false,
      new_row_name: "",
      center_latitude: 0,
      center_longitude: 0,
      zoom_level: 0,
      allow_multiple_points: false,
      coord_x: 0,
      coord_y: 0,
      add_mark: false,
    };

    switch (data.task_type) {
      case "multichoice":
        return {
          ...basePayload,
          multiple_answers: data.multiple_answers ?? false,
          options: data.options || [],
        };

      case "description":
        return {
          ...basePayload,
        };

      case "short_task":
        return {
          ...basePayload,
          max_characters_allowed: data.max_characters_allowed ?? 100,
        };

      case "table_task":
        return {
          ...basePayload,
          columns: data.columns,
          rows: data.rows || 3,
          show_graf: true,
          allow_adding_of_rows: true,
          new_row_name: data.name,
        };

      case "map_task":
        return {
          ...basePayload,
          add_mark: true,
          coord_x: data.center_latitude ?? 0,
          coord_y: data.center_longitude ?? 0,
        };

      case "numbers_task":
        return {
          ...basePayload,
          min_num: data.min_num ?? 0,
          max_num: data.max_num ?? 100,
        };

      default:
        throw new Error(`Unknown task type: ${data.task_type}`);
    }
  };

  const handleConfirmedSubmit = async () => {
    setIsSubmitting(true);
    try {
      const url = `http://localhost:3000/${
        mode === "create" ? "addTask" : "editTask"
      }/${task.task_type}`;
      const payload = formatPayload(task);

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error((await response.text()) || "Failed to save task");
      }

      toast({
        title: t("success.taskSaved"),
        status: "success",
        duration: 3000,
      });

      navigate(`/room/${roomName}/edit`);
    } catch (error) {
      console.error("Error saving task:", error);
      toast({
        title: t("error.failedToSave"),
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
      setIsConfirmOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};
    if (!task.text) validationErrors.text = "Text is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: t("error.validationFailed"),
        status: "error",
        duration: 3000,
      });
      return;
    }

    if (mode === "edit") {
      setIsConfirmOpen(true);
    } else {
      handleConfirmedSubmit();
    }
  };

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
            <TaskTypeSelect
              value={task.task_type}
              onChange={handleTypeChange}
              isSubmitting={isSubmitting}
            />

            {task.task_type === "description" && (
              <DescriptionTaskFields
                description={task.text}
                errors={{ text: errors.text }}
                onChange={handleInputChange}
                isSubmitting={isSubmitting}
              />
            )}

            {task.task_type === "short_task" && (
              <>
                <BasicTaskFields
                  name={task.name}
                  text={task.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <ShortTaskFields
                  maxCharacters={task.max_characters_allowed}
                  error={errors.max_characters_allowed}
                  onChange={(value) =>
                    handleInputChange("max_characters_allowed", value)
                  }
                  isSubmitting={isSubmitting}
                />
              </>
            )}

            {task.task_type === "numbers_task" && (
              <>
                <BasicTaskFields
                  name={task.name}
                  text={task.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <NumberTaskFields
                  minNum={task.min_num}
                  maxNum={task.max_num}
                  errors={{
                    min_num: errors.min_num,
                    max_num: errors.max_num,
                  }}
                  onChange={{
                    min_num: (value) => handleInputChange("min_num", value),
                    max_num: (value) => handleInputChange("max_num", value),
                  }}
                  isSubmitting={isSubmitting}
                />
              </>
            )}

            {task.task_type === "multichoice" && (
              <>
                <BasicTaskFields
                  name={task.name}
                  text={task.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <MultiChoiceFields
                  options={task.options || []}
                  multipleAnswers={task.multiple_answers || false}
                  error={errors.options}
                  onChange={{
                    options: (value) => handleInputChange("options", value),
                    multipleAnswers: (value) =>
                      handleInputChange("multiple_answers", value),
                  }}
                  isSubmitting={isSubmitting}
                />
              </>
            )}

            {task.task_type === "table_task" && (
              <>
                <BasicTaskFields
                  name={task.name}
                  text={task.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <TableTaskFields
                  columns={task.columns || ""}
                  rows={task.rows || 3}
                  errors={{
                    columns: errors.columns,
                    rows: errors.rows,
                  }}
                  onChange={{
                    columns: (value) => handleInputChange("columns", value),
                    rows: (value) => handleInputChange("rows", value),
                  }}
                  isSubmitting={isSubmitting}
                />
              </>
            )}

            {task.task_type === "map_task" && (
              <>
                <BasicTaskFields
                  name={task.name}
                  text={task.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <MapTaskFields
                  centerLatitude={task.center_latitude}
                  centerLongitude={task.center_longitude}
                  errors={{
                    center_latitude: errors.center_latitude,
                    center_longitude: errors.center_longitude,
                  }}
                  onChange={{
                    centerLatitude: (value) =>
                      handleInputChange("center_latitude", value),
                    centerLongitude: (value) =>
                      handleInputChange("center_longitude", value),
                  }}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
          </VStack>
        </CardBody>

        <CardFooter>
          <HStack spacing={4} justify="flex-end" w="100%">
            <Button
              onClick={() => navigate(`/room/${roomName}/edit`)}
              size="lg"
              isDisabled={isSubmitting}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              isDisabled={isSubmitting}
            >
              {mode === "create" ? t("createTask") : t("saveChanges")}
            </Button>
          </HStack>
        </CardFooter>
      </Card>

      {mode === "edit" && (
        <AlertDialog
          isOpen={isConfirmOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsConfirmOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {t("confirmAction")}
              </AlertDialogHeader>

              <AlertDialogBody>{t("saveChangesConfirmation")}</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => setIsConfirmOpen(false)}
                  isDisabled={isSubmitting}
                >
                  {t("cancel")}
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={handleConfirmedSubmit}
                  ml={3}
                  isLoading={isSubmitting}
                  loadingText={t("saving")}
                >
                  {t("save")}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Box>
  );
};

export default TaskForm;
