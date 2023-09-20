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

import { createReminder } from 'apiSdk/reminders';
import { reminderValidationSchema } from 'validationSchema/reminders';
import { ScheduleInterface } from 'interfaces/schedule';
import { UserInterface } from 'interfaces/user';
import { getSchedules } from 'apiSdk/schedules';
import { getUsers } from 'apiSdk/users';
import { ReminderInterface } from 'interfaces/reminder';

function ReminderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReminderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReminder(values);
      resetForm();
      router.push('/reminders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReminderInterface>({
    initialValues: {
      reminder_date: new Date(new Date().toDateString()),
      message: '',
      schedule_id: (router.query.schedule_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: reminderValidationSchema,
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
              label: 'Reminders',
              link: '/reminders',
            },
            {
              label: 'Create Reminder',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Reminder
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="reminder_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Reminder Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.reminder_date ? new Date(formik.values?.reminder_date) : null}
              onChange={(value: Date) => formik.setFieldValue('reminder_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.message}
            label={'Message'}
            props={{
              name: 'message',
              placeholder: 'Message',
              value: formik.values?.message,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ScheduleInterface>
            formik={formik}
            name={'schedule_id'}
            label={'Select Schedule'}
            placeholder={'Select Schedule'}
            fetcher={getSchedules}
            labelField={'status'}
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
              onClick={() => router.push('/reminders')}
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
    entity: 'reminder',
    operation: AccessOperationEnum.CREATE,
  }),
)(ReminderCreatePage);
