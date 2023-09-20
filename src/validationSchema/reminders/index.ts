import * as yup from 'yup';

export const reminderValidationSchema = yup.object().shape({
  reminder_date: yup.date().required(),
  message: yup.string().nullable(),
  schedule_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
