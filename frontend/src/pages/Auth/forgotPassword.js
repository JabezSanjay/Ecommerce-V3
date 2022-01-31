import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import ForgotPasswordImage from '../../assets/images/auth/forgot-password-page.jpeg';
// import GoogleIcon from '../../assets/images/icons/google-icon.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Layout/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from './helpers';
import Toast from '../../components/Toast';
import AuthCard from '../../components/AuthCard';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email!')
      .required('Email is required!'),
  })
  .required();

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const forgotPasswordProcess = useSelector((state) => state);
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
    await forgotPassword(data, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('Check your email for reset password link!');
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
            src={ForgotPasswordImage}
            alt='img'
          />
        </div>
        <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
          <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='mb-4 text-2xl font-bold text-center text-gray-700'>
                Forgot Password
              </h1>
              <div>
                <Input
                  type='email'
                  name='Email'
                  placeholder='Enter your email'
                  formValidation={{ ...register('email') }}
                  formInputName='email'
                  errorText={errors.email?.message}
                  register={register}
                  error={errors}
                />
              </div>
              <Button
                name='Send Password Reset Link'
                onClick={() => setSubmitted(!submitted)}
                loading={forgotPasswordProcess.auth.loading}
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

export default ForgotPassword;
