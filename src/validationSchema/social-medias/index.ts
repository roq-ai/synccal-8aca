import * as yup from 'yup';

export const socialMediaValidationSchema = yup.object().shape({
  platform: yup.string().required(),
  profile_url: yup.string().nullable(),
  followers_count: yup.number().integer().nullable(),
  following_count: yup.number().integer().nullable(),
  post_count: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
