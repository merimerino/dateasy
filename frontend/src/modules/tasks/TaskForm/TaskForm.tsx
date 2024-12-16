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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useTaskForm } from "./useTaskForm";
import TaskTypeSelect from "./components/TaskTypeSelect";
import BasicTaskFields from "./components/BasicTaskFields";
import ShortTaskFields from "./components/ShortTaskFields";
import NumberTaskFields from "./components/NumberTaskFields";
import MultiChoiceFields from "./components/MultiChoiceFields";
import TableTaskFields from "./components/TableTaskFields";
import MapTaskFields from "./components/MapTaskFields";
import { TaskFormProps } from "./types";
import DescriptionTaskFields from "./components/DescriptionTaskFields";

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialData }) => {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleTypeChange,
    handleSubmit,
    handleCancel,
  } = useTaskForm({ mode, initialData });

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
              value={formData.task_type}
              onChange={handleTypeChange}
              isSubmitting={isSubmitting}
            />

            {formData.task_type === "description" && (
              <>
                <DescriptionTaskFields
                  description={formData.text}
                  errors={{
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
            {formData.task_type === "short_task" && (
              <>
                <BasicTaskFields
                  name={formData.name}
                  text={formData.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <ShortTaskFields
                  maxCharacters={formData.max_characters_allowed}
                  error={errors.max_characters_allowed}
                  onChange={(value) =>
                    handleInputChange("max_characters_allowed", value)
                  }
                  isSubmitting={isSubmitting}
                />
              </>
            )}

            {formData.task_type === "numbers_task" && (
              <>
                <BasicTaskFields
                  name={formData.name}
                  text={formData.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <NumberTaskFields
                  minNum={formData.min_num}
                  maxNum={formData.max_num}
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

            {formData.task_type === "multichoice" && (
              <>
                <BasicTaskFields
                  name={formData.name}
                  text={formData.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <MultiChoiceFields
                  options={formData.options || []}
                  multipleAnswers={formData.multiple_answers || false}
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

            {formData.task_type === "table_task" && (
              <>
                <BasicTaskFields
                  name={formData.name}
                  text={formData.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <TableTaskFields
                  columns={formData.columns || []}
                  rows={formData.rows || 3}
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

            {formData.task_type === "map_task" && (
              <>
                <BasicTaskFields
                  name={formData.name}
                  text={formData.text}
                  errors={{
                    name: errors.name,
                    text: errors.text,
                  }}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
                <MapTaskFields
                  centerLatitude={formData.center_latitude}
                  centerLongitude={formData.center_longitude}
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
