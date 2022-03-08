import * as yup from "yup";

const availableLangauges = ["en_US", "tr_TR"];

const settings = yup.object().shape({
  prefix: yup.string().required(),
  language: yup.string().oneOf(availableLangauges).required(),
});

const moderation = yup.object().shape({
  adminRole: yup.string().nullable(true).defined(),
  autoRole: yup.string().nullable(true).defined(),
  modRole: yup.string().nullable(true).defined(),
});

export default { settings, moderation };
