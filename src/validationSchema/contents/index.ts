import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().nullable(),
  status: yup.string().nullable(),
  publish_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  business_id: yup.string().nullable().required(),
});
