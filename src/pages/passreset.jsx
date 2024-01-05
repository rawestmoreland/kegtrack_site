import { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import AlertBox, { AlertVariants } from '@/components/AlertBox';

export const getServerSideProps = async ({ req }) => {
  const userAgent = req.headers['user-agent'];
  const isMobileView = Boolean(
    userAgent?.match(
      /Android|Blackberry|iPhone|iPad|iPod|Opera Mini|IEMobile\WPDesktop/i
    )
  );

  return { props: { isMobileView } };
};

export default function PassReset({ isMobileView }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState();
  const [accessToken, setAccessToken] = useState();

  const router = useRouter();

  useEffect(() => {
    if (accessToken) return;
    const fragment = window.location.hash.substring(1);
    const hash = new URLSearchParams(fragment);

    const token = hash.get('access_token');

    setAccessToken(token);
  }, []);

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { password: '', confirmPassword: '' } });

  const password = useRef({});
  const passwordConfirm = useRef();
  passwordConfirm.current = watch('confirmPassword', '');
  password.current = watch('password', '');

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
        {!submitted && (
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
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                }}
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
        )}

        {submitError && (
          <div className="mt-4">
            <AlertBox variant={AlertVariants.error}>{submitError}</AlertBox>
          </div>
        )}
        {submitted && (
          <div className="mt-4 flex flex-col items-center gap-4">
            <AlertBox variant={AlertVariants.success}>
              Your password has been reset. Proceed to the KegTrack app to sign
              in with your new password.
            </AlertBox>

            {/* {isMobileView && (
              <Button color="cyan" href="/signin" className="w-full">
                Return to the app
              </Button>
            )} */}
          </div>
        )}
      </AuthLayout>
    </>
  );
}
