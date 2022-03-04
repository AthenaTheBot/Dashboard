import * as yup from "yup";

const availableLangauges = ["en_US", "tr_TR"];

const settings = yup.object().shape({
  prefix: yup.string().required(),
  language: yup.string().oneOf(availableLangauges).required(),
});

const moderation = yup.object().shape({
  adminRole: yup.string().required(),
  modRole: yup.string().required(),
  autoRole: yup.string().required(),
});

export default { settings, moderation };
