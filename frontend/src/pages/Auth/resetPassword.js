import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import ResetPasswordImage from '../../assets/images/auth/reset-password-page.jpeg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Layout/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './helpers';
import Toast from '../../components/Toast';
import AuthCard from '../../components/AuthCard';
import { useParams } from 'react-router-dom';

const schema = yup
  .object({
    password: yup.string().required('New Password is required!'),
    confirmPassword: yup.string().required('Confirm Password is required!'),
  })
  .required();

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const resetPasswordProcess = useSelector((state) => state);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    await resetPassword(data, dispatch, id).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('Password reset successfully!');
      }
    });
    reset();
  };
  return (
    <>
      <Navbar />
      <AuthCard>
        <div className='h-32 md:h-auto md:w-1/2'>
          <img
            className='object-cover w-full h-full'
            src={ResetPasswordImage}
            alt='img'
          />
        </div>
        <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
          <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='mb-4 text-2xl font-bold text-center text-gray-700'>
                Reset Password
              </h1>
              <div>
                <Input
                  type='password'
                  name='Password'
                  placeholder='Enter your new password'
                  formValidation={{ ...register('password') }}
                  formInputName='email'
                  errorText={errors.password?.message}
                  register={register}
                  error={errors}
                />
                <Input
                  type='password'
                  name='Confirm Password'
                  placeholder='Re enter your new password'
                  formValidation={{ ...register('confirmPassword') }}
                  formInputName='email'
                  errorText={errors.confirmPassword?.message}
                  register={register}
                  error={errors}
                />
              </div>
              <Button
                name='Send Password Reset Link'
                onClick={() => setSubmitted(!submitted)}
                loading={resetPasswordProcess.auth.loading}
              />
            </form>
          </div>
        </div>
      </AuthCard>
      {}
      <Toast />
    </>
  );
};

export default ResetPassword;
