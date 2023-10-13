import { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import RouterPaths from '../../Paths/Paths';
import ServiceContext from '../../context';
import { SignInSchema } from '../../YUP';

import styles from './signIn.module.css';

const SignIn = ({ history, setAuth, setErrorState }) => {
  const testService = useContext(ServiceContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    testService
      .login(data.email, data.password)
      .then((res) => {
        if (!res.ok) {
          setErrorState({ status: true, message: `${res.ok}Error` });
        }
        return res.json();
      })
      /* eslint-disable-next-line */
      .then((res) => {
        localStorage.setItem('isAuth', JSON.stringify({ auth: true }));
        setAuth({ auth: true });
        history.push('/articles');
        setErrorState({ status: true, message: 'Вход выполнен!' });
        setTimeout(() => {
          setErrorState({ status: false, message: '' });
        }, 2000);
        reset();
      })

      .catch((err) => {
        setErrorState({ status: true, message: `Запрос завершился неудачно ${err.message}` });
        setTimeout(() => {
          setErrorState({ status: false, message: '' });
        }, 2000);
      });
  };

  return (
    <div className={styles.signIn}>
      <form className={styles.signIn__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signIn__title}>Sign In</div>

        <div className={styles.signIn__label}>
          <span className={styles.signIn__desctiption}>Email address</span>
          <br />
          <input className={styles.signIn__input} {...register('email')} />
          <br />
          <span className={styles.signIn__warning}>{errors?.email && <p>{errors?.email?.message}</p>}</span>
        </div>

        <div className={styles.signIn__label}>
          <span className={styles.signIn__desctiption}>Password</span>
          <br />
          <input className={styles.signIn__input} {...register('password')} />
          <br />
          <span className={styles.signIn__warning}>{errors?.password && <p>{errors?.password?.message}</p>}</span>
        </div>

        <input type="submit" className={styles.signIn__submit} name="submit_btn" value="Login" />
        <div className={styles.signIn__question}>
          Don&#8217;t have an account?{' '}
          <Link to={RouterPaths.signUp} className={styles.signIn__questionBlue}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignIn);
