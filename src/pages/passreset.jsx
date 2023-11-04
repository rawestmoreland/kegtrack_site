import { useEffect, useRef, useState } from 'react';

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
  const [accessToken, setAccessToken] = useState();

  const password = useRef({});

  const router = useRouter();

  useEffect(() => {
    if (accessToken) return;
    const hash = router.asPath.split('#')[1];

    const parsedHash = new URLSearchParams(hash);

    const token = parsedHash.get('access_token');

    console.log(token);

    setAccessToken(token);
  }, []);

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
      .request({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        data: {
          password: data.password,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
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
        <title>Password Recovery - KegTrack</title>
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
                  disabled={!accessToken || submitting}
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
                  disabled={!accessToken || submitting}
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
            disabled={!accessToken || submitting}
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
