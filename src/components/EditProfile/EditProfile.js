import React, { useEffect, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { EditProfileSchema } from '../../YUP';
import ServiceContext from '../../context';
import RouterPaths from '../../Paths/Paths';

import styles from './editProfile.module.css';

const EditProfile = ({ curUser, history, showMessage, auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');

  const testService = useContext(ServiceContext);
  useEffect(() => {
    if (curUser.user) {
      const { user } = curUser;
      setUsername(user.username);
      setEmail(user.email);
      setImage(user.image);
    }
  }, [curUser]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(EditProfileSchema),
  });

  const onSubmit = (data) => {
    testService
      .updateCurrentUser({ user: data })
      .then((res) => {
        if (!res.ok) {
          showMessage(`Ошибка ${res.ok}`);
        }
        return res.json();
      })
      /* eslint-disable-next-line */
      .then((res) => {
        showMessage('Данные успешно отредактированы!');
        history.push(RouterPaths.articles);
        reset();
      })
      .catch((err) => {
        showMessage(`Ошибка при отправке данных! ${err.message}`);
      });
  };

  if (auth.auth) {
    return (
      <div className={styles.editProfile}>
        <form className={styles.editProfile__form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.editProfile__title}>Edit Profile</div>

          <div className={styles.editProfile__label}>
            <span className={styles.editProfile__email}>Username</span>
            <br />
            <input
              className={styles.editProfile__input}
              {...register('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <span className={styles.editProfile__warning}>
              {errors?.username && <p>{errors?.username?.message}</p>}
            </span>
          </div>

          <div className={styles.editProfile__label}>
            <span className={styles.editProfile__email}>Email address</span>
            <br />
            <input
              className={styles.editProfile__input}
              {...register('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <span className={styles.editProfile__warning}>{errors?.email && <p>{errors?.email?.message}</p>}</span>
          </div>

          <div className={styles.editProfile__label}>
            <span className={styles.editProfile__email}>New password</span>
            <br />
            <input
              className={styles.editProfile__input}
              {...register('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <span className={styles.editProfile__warning}>
              {errors?.password && <p>{errors?.password?.message}</p>}
            </span>
          </div>

          <div className={styles.editProfile__label}>
            <span className={styles.editProfile__email}>Avatar img (url)</span>
            <br />
            <input
              className={styles.editProfile__input}
              {...register('image')}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <br />
            <span className={styles.editProfile__warning}>{errors?.image && <p>{errors?.image?.message}</p>}</span>
          </div>

          <input type="submit" className={styles.editProfile__submit} name="submit_btn" value="Login" />
        </form>
      </div>
    );
  }
  return <h1 style={{ marginLeft: '200px' }}>Это приватная страница! Вам необходимо авторизоваться.</h1>;
};

export default withRouter(EditProfile);
