import * as yup from "yup";

const availableLangauges = ["en_US", "tr_TR"];

const SettingsCategorySchema = yup.object().shape({
  prefix: yup.string().required(),
  language: yup.string().oneOf(availableLangauges).required(),
});

export default { SettingsCategorySchema };
