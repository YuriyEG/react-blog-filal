import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Check from '../Check';
import ServiceContext from '../../context';
import { SignUpSchema } from '../../YUP';
import RouterPaths from '../../Paths/Paths';

import styles from './signUp.module.css';

const SignUp = ({ history, setErrorState }) => {
  const testService = useContext(ServiceContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = (data) => {
    if (password === password2) {
      testService
        .createUser(data)
        .then((res) => {
          if (!res.ok) {
            setErrorState({ status: true, message: `${res.ok} Error!` });
            setTimeout(() => {
              setErrorState({ status: false, message: '' });
            }, 1000);
          }
          return res.json();
        })
        /* eslint-disable-next-line */
        .then((res) => {
          setErrorState({ status: true, message: 'Вы успешно зарегистрировались!' });
          setTimeout(() => {
            setErrorState({ status: false, message: '' });
          }, 1000);
          reset();
          history.push(RouterPaths.signIn);
        })
        .catch((err) => {
          setErrorState({ status: true, message: err.message });
          setTimeout(() => {
            setErrorState({ status: false, message: '' });
          }, 1000);
        });
    }
  };

  return (
    <div className={styles.signUp}>
      <form className={styles.signUp__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signUp__title}>Create new account</div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Username</span>
          <br />
          <input className={styles.signUp__input} {...register('username')} />
          <br />
          <span className={styles.signUp__warning}>{errors?.username && <p>{errors?.username?.message}</p>}</span>
        </div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Email address</span>
          <br />
          <input className={styles.signUp__input} {...register('email')} />
          <br />

          <span className={styles.signUp__warning}>{errors?.email && <p>{errors?.email?.message}</p>}</span>
        </div>

        <div className={styles.signUp__label}>
          <span className={styles.signUp__description}>Password</span>
          <br />
          <input
            className={styles.signUp__input}
            {...register('password')}
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
            {...register('password2')}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <span className={styles.signUp__warning}>
            {password === password2 ? errors?.password2 && <p>{errors?.password2?.message}</p> : 'Пароли не совпадают!'}
          </span>
          <br />
        </div>
        <Check descript={'I agree to the processing of my personal information'} />
        <input type="submit" className={styles.signUp__submit} />
        <div className={styles.signUp__question}>
          Already have an account?{' '}
          <Link to={RouterPaths.signIn} className={styles.signUp__questionBlue}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
