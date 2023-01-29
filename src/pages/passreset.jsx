import { useRef, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import AlertBox, { AlertVariants } from '@/components/AlertBox';

export default function PassReset() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState();

  const password = useRef({});

  const router = useRouter();
  const query = router.query;

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { password: '', confirmPassword: '' } });

  password.current = watch('password');

  const submitForm = async (data) => {
    setSubmitError();
    setSubmitted();
    setSubmitting(true);
    await axios
      .post(`http://localhost:1337/api/auth/reset-password`, {
        code: query.code,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      })
      .then(() => {
        reset();
        router.replace('/passreset', undefined, { shallow: true });
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch((error) => {
        if (error?.response?.data?.error?.message) {
          if (error.response.data.error.message.includes('code')) {
            setSubmitError(
              'Your password reset code has expired. Please submit abother password reset request from the KegTrack App.'
            );
          } else setSubmitError(error.response.data.error.message);
        } else setSubmitError('There was a problem updating your password.');
        setSubmitting(false);
      });
  };

  return (
    <>
      <Head>
        <title>Password Recorvery - KegTrack</title>
      </Head>
      <AuthLayout
        title="Reset Your KegTrack Password"
        subtitle={<>Submit your new password below</>}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="space-y-6">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  disabled={!query.code || submitting}
                  label="New Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  disabled={!query.code || submitting}
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirmPassword"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
          <Button
            disabled={!query.code || submitting}
            type="submit"
            color="cyan"
            className="mt-8 w-full"
          >
            Reset Your Password
          </Button>
        </form>
        {submitError && (
          <div className="mt-4">
            <AlertBox variant={AlertVariants.error}>{submitError}</AlertBox>
          </div>
        )}
        {submitted && (
          <div className="mt-4">
            <AlertBox variant={AlertVariants.success}>
              Your password has been reset. Proceed to the KegTrack app to sign
              in with your new password.
            </AlertBox>
          </div>
        )}
      </AuthLayout>
    </>
  );
}
