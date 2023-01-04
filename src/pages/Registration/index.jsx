import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { fetchRegister, isAuthSelector } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit,
    setError, 
    formState : { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Alexandra',
      email: 'alexandra@test.com',
      password: '123456',
    },
    mode: 'onChange', //all
  });

  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if (!data.payloaded) {
      console.log("hhh" + data);
      return alert('Failed registration');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error= {Boolean(errors.fullName?.message)}
            helperText= {errors.fullName?.message}
            type="email"
            {...register( 'fullName', {required: 'Write your full name'})} className={styles.field} label="FullName" fullWidth />
        <TextField error= {Boolean(errors.email?.message)}
            helperText= {errors.email?.message}
            type="email"
            {...register( 'email', {required: 'Write your email'})} className={styles.field} label="E-Mail" fullWidth />
        <TextField error= {Boolean(errors.password?.message)}
            helperText= {errors.password?.message}
            type="password"
            {...register( 'password', {required: 'Write your password'})} className={styles.field} label="Password" fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
