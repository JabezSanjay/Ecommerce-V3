import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SignUpImage from '../../assets/images/auth/signup-page.jpg';
import GoogleIcon from '../../assets/images/icons/google-icon.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Layout/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, signInUserGoogle } from './helpers';
import Toast from '../../components/Toast';
import AuthCard from '../../components/AuthCard';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required!')
      .min(3, 'Name must be atleast 3 characters long!'),
    email: yup
      .string()
      .email('Enter a valid email!')
      .required('Email is required!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Password must be atleast 6 characters long!'),
  })
  .required();

const Signup = () => {
  const dispatch = useDispatch();
  const signUpProcess = useSelector((state) => state);
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
    await signupUser(data, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('User created successfully!');
      }
    });
    reset();
  };
  const onSubmitGoogle = async () => {
    await signInUserGoogle(dispatch);
  };
  return (
    <>
      <Navbar />
      <AuthCard>
        <div className='h-32 md:h-auto md:w-1/2'>
          <img
            className='object-cover w-full h-full'
            src={SignUpImage}
            alt='img'
          />
        </div>
        <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
          <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='mb-4 text-2xl font-bold text-center text-gray-700'>
                Sign up
              </h1>
              <div>
                <Input
                  type='text'
                  name='Name'
                  placeholder='Enter your user name'
                  formValidation={{ ...register('name') }}
                  formInputName='name'
                  errorText={errors.name?.message}
                  register={register}
                  error={errors}
                />
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
                <Input
                  type='password'
                  name='Password'
                  placeholder='Enter your password'
                  formValidation={{ ...register('password') }}
                  formInputName='password'
                  errorText={errors.password?.message}
                  register={register}
                  error={errors}
                />
              </div>
              <Button
                name='Sign up'
                onClick={() => setSubmitted(!submitted)}
                loading={signUpProcess.auth.loading}
              />
            </form>
            <div className='mt-3 text-center'>
              <span className='font-medium text-gray-500 text-sm'>Or</span>
              <div className='flex flex-col items-center'>
                <button
                  onClick={onSubmitGoogle}
                  className='w-full font-semibold rounded-lg py-1 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm my-3'
                >
                  <span className='bg-white p-2 rounded-full'>
                    <img src={GoogleIcon} className='w-4' alt='' />
                  </span>
                  <span className='ml-4'>Sign in with Google</span>
                </button>
              </div>
            </div>
            <div className='mt-4 text-center'>
              <p className='text-sm'>
                Already have an account?
                <Link
                  to='/signin'
                  className='text-primary-600 hover:underline ml-2'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthCard>
      {}
      <Toast />
    </>
  );
};

export default Signup;
