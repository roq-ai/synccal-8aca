import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSocialMedia } from 'apiSdk/social-medias';
import { socialMediaValidationSchema } from 'validationSchema/social-medias';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { SocialMediaInterface } from 'interfaces/social-media';

function SocialMediaCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SocialMediaInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSocialMedia(values);
      resetForm();
      router.push('/social-medias');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SocialMediaInterface>({
    initialValues: {
      platform: '',
      profile_url: '',
      followers_count: 0,
      following_count: 0,
      post_count: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: socialMediaValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Social Medias',
              link: '/social-medias',
            },
            {
              label: 'Create Social Media',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Social Media
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.platform}
            label={'Platform'}
            props={{
              name: 'platform',
              placeholder: 'Platform',
              value: formik.values?.platform,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.profile_url}
            label={'Profile Url'}
            props={{
              name: 'profile_url',
              placeholder: 'Profile Url',
              value: formik.values?.profile_url,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Followers Count"
            formControlProps={{
              id: 'followers_count',
              isInvalid: !!formik.errors?.followers_count,
            }}
            name="followers_count"
            error={formik.errors?.followers_count}
            value={formik.values?.followers_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('followers_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Following Count"
            formControlProps={{
              id: 'following_count',
              isInvalid: !!formik.errors?.following_count,
            }}
            name="following_count"
            error={formik.errors?.following_count}
            value={formik.values?.following_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('following_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Post Count"
            formControlProps={{
              id: 'post_count',
              isInvalid: !!formik.errors?.post_count,
            }}
            name="post_count"
            error={formik.errors?.post_count}
            value={formik.values?.post_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('post_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/social-medias')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'social_media',
    operation: AccessOperationEnum.CREATE,
  }),
)(SocialMediaCreatePage);
