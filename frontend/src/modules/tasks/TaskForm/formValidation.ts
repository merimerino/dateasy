import { ExtendedTask, FormErrors } from "./types";
import { TFunction } from "i18next";

// Main validation function
export const validateForm = (data: ExtendedTask, t: TFunction): FormErrors => {
  const errors: FormErrors = {};

  // Validate common fields
  if (!data.name.trim()) {
    errors.name = t("error.nameRequired");
  }

  if (!data.text.trim()) {
    errors.text = t("error.textRequired");
  }

  // Type-specific validation
  switch (data.task_type) {
    case "multichoice":
      validateMultiChoiceTask(data, errors, t);
      break;
    case "numbers_task":
      validateNumberTask(data, errors, t);
      break;
    case "short_task":
      validateShortTask(data, errors, t);
      break;
    case "table_task":
      validateTableTask(data, errors, t);
      break;
    case "map_task":
      validateMapTask(data, errors, t);
      break;
  }

  return errors;
};

const validateMultiChoiceTask = (
  data: ExtendedTask,
  errors: FormErrors,
  t: TFunction
): void => {
  if (!Array.isArray(data.options) || data.options.length < 2) {
    errors.options = t("error.minimumTwoOptions");
    return;
  }

  if (data.options.some((opt) => !opt?.trim())) {
    errors.options = t("error.emptyOptions");
    return;
  }

  const uniqueOptions = new Set(data.options.map((opt) => opt.trim()));
  if (uniqueOptions.size !== data.options.length) {
    errors.options = t("error.duplicateOptions");
  }
};

const validateNumberTask = (
  data: ExtendedTask,
  errors: FormErrors,
  t: TFunction
): void => {
  if (typeof data.min_num !== "number") {
    errors.min_num = t("error.invalidMinNumber");
    return;
  }

  if (typeof data.max_num !== "number") {
    errors.max_num = t("error.invalidMaxNumber");
    return;
  }

  if (data.max_num <= data.min_num) {
    errors.max_num = t("error.maxGreaterThanMin");
  }
};

const validateShortTask = (
  data: ExtendedTask,
  errors: FormErrors,
  t: TFunction
): void => {
  if (
    typeof data.max_characters_allowed !== "number" ||
    data.max_characters_allowed < 1
  ) {
    errors.max_characters_allowed = t("error.invalidMaxCharacters");
    return;
  }

  if (data.max_characters_allowed > 1000) {
    errors.max_characters_allowed = t("error.maxCharactersTooLarge");
  }
};

const validateTableTask = (
  data: ExtendedTask,
  errors: FormErrors,
  t: TFunction
): void => {
  if (!Array.isArray(data.columns) || data.columns.length === 0) {
    errors.columns = t("error.headersRequired");
    return;
  }

  if (data.columns.some((columns) => !columns?.trim())) {
    errors.columns = t("error.emptyHeaders");
    return;
  }

  // Check for duplicate headers
  const uniqueHeaders = new Set(data.columns.map((h) => h.trim()));
  if (uniqueHeaders.size !== data.columns.length) {
    errors.columns = t("error.duplicateHeaders");
  }

  if (typeof data.rows !== "number" || data.rows < 1) {
    errors.rows = t("error.invalidRows");
  }

  if (typeof data.columns !== "number" || data.columns < 1) {
    errors.columns = t("error.invalidColumns");
  }
};

const validateMapTask = (
  data: ExtendedTask,
  errors: FormErrors,
  t: TFunction
): void => {
  if (
    typeof data.center_latitude === "number" &&
    (data.center_latitude < -90 || data.center_latitude > 90)
  ) {
    errors.center_latitude = t("error.invalidLatitude");
  }

  if (
    typeof data.center_longitude === "number" &&
    (data.center_longitude < -180 || data.center_longitude > 180)
  ) {
    errors.center_longitude = t("error.invalidLongitude");
  }
};

// Helper for single field validation
export const validateField = (
  field: keyof ExtendedTask,
  value: ExtendedTask[keyof ExtendedTask],
  t: TFunction
): string | undefined => {
  switch (field) {
    case "name":
      return typeof value === "string" && !value.trim()
        ? t("error.nameRequired")
        : undefined;

    case "text":
      return typeof value === "string" && !value.trim()
        ? t("error.textRequired")
        : undefined;

    case "max_characters_allowed":
      if (typeof value !== "number" || value < 1)
        return t("error.invalidMaxCharacters");
      if (value > 1000) return t("error.maxCharactersTooLarge");
      return undefined;

    case "min_num":
    case "max_num":
      return typeof value !== "number" ? t("error.invalidNumber") : undefined;

    default:
      return undefined;
  }
};
