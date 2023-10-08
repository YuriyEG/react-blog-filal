/* eslint-disable */

import React, { useEffect, useState, setErrorState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import Check from '../Check';
import styles from './signUp.module.css';
import ServiceContext from '../../context';

const SignUp = ({ history, setErrorState }) => {

  const testService = useContext(ServiceContext);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      password2: '',
    },
  });

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const loadPassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (data) => {
    if (password === password2) {
      testService.createUser(
        data,
        (res) => {
          localStorage.setItem('token', res.user.token);
          setErrorState({ status: true, message: 'Регистрация прошла успешно!' });
          setTimeout(() => {
            setErrorState({ status: false, message: '' });
          }, 1500);
        },

        (err) => {
          setErrorState({ status: true, message: 'При регистрации произошла ошибка!' });
          setTimeout(() => {
            setErrorState({ status: false, message: '' });
          }, 1500);
        }
      );
      reset();
      history.push('sign-in/');
    }
  };

  return (
    <div className={styles.signUp}>
      <form className={styles.signUp__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signUp__title}>Create new account</div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Username</span>
          <br />
          <input
            className={styles.signUp__input}
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов',
              },
            })}
          />
          <br />
          <span className={styles.signUp__warning}>{errors?.username && <p>{errors?.username?.message}</p>}</span>
        </div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Email address</span>
          <br />
          <input
            className={styles.signUp__input}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value:
                  /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/,
                message: 'Please enter valid email!',
              },
              minLength: { value: 4, message: 'Минимум 4 символа' },
              maxLength: {
                value: 100,
                message: 'Максимум 100 символов',
              },
            })}
          />
          <br />

          <span className={styles.signUp__warning}>{errors?.email && <p>{errors?.email?.message}</p>}</span>
        </div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Password</span>
          <br />
          <input
            className={styles.signUp__input}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 6, message: 'Минимум 6 символов' },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов',
              },
            })}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <span className={styles.signUp__warning}>{errors?.password && <p>{errors?.password?.message}</p>}</span>
        </div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Repeat password</span>
          <br />

          <input
            className={styles.signUp__input}
            {...register('password2', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 6, message: 'Минимум 6 символов' },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов',
              },
              value: {
                value: '1111',
                message: 'error',
              },
            })}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <span className={styles.signUp__warning}>
            {password === password2 ? errors?.password2 && <p>{errors?.password2?.message}</p> : 'Пароли не совпадают!'}
          </span>
          <br />
        </div>
        <Check descript={'I agree to the processing of my personal information'} />
        <input type="submit" className={styles.signUp__submit} disabled={!isValid} />
        <div className={styles.signUp__question}>
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.signUp__questionBlue}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
