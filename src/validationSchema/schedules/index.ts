import * as yup from 'yup';

export const scheduleValidationSchema = yup.object().shape({
  schedule_date: yup.date().required(),
  status: yup.string().nullable(),
  content_id: yup.string().nullable().required(),
  social_media_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
