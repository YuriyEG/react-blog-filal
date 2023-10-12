/* eslint-disable */

import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';


import { withRouter } from 'react-router-dom';

import styles from './editProfile.module.css';
import { EditProfileSchema } from '../../YUP';
import { yupResolver } from '@hookform/resolvers/yup';

import ServiceContext from '../../context';

const EditProfile = ({ curUser, history, setErrorState }) => {

  const testService = useContext(ServiceContext);
  useEffect(() => {
    if (curUser.user) {
      const { user } = curUser;
      document.getElementById('username').placeholder = user.username;
      document.getElementById('email').placeholder = user.email;
      document.getElementById('image').placeholder = user.image;
    }
  }, [curUser]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(EditProfileSchema)
  });

  const onSubmit = (data) => {
    
    console.log(data);
    testService.updateCurrentUser(
      { user: data },

      (res) => {
        setErrorState({status: true, message: 'Данные отредактированы!'});
        setTimeout(() => {
          setErrorState({status: false, message: '' })
        }, 1500);
        history.push('/articles');
      },
      (err) => {
        setErrorState({status: true, message: 'Ошибка при отправке данных!'});
        setTimeout(() => {
          setErrorState({status: false, message: '' })
        }, 1500);
      }
    );
    reset();

  };

  return (
    <div className={styles.editProfile}>
      <form className={styles.editProfile__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.editProfile__title}>Edit Profile</div>

        <div className={styles.editProfile__label}>
          <span className={styles.editProfile__email}>Username</span>
          <br />
          <input id="username" className={styles.editProfile__input} {...register('username')} />
          <br />
          <span className={styles.editProfile__warning}>{errors?.username && <p>{errors?.username?.message}</p>}</span>
        </div>

        <div className={styles.editProfile__label}>
          <span className={styles.editProfile__email}>Email address</span>
          <br />
          <input
            id="email"
            className={styles.editProfile__input}
            {...register('email')}
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
          />
          <br />

          <span className={styles.editProfile__warning}>{errors?.password && <p>{errors?.password?.message}</p>}</span>
        </div>

        <div className={styles.editProfile__label}>
          <span className={styles.editProfile__email}>Avatar img (url)</span>
          <br />
          <input id="image" className={styles.editProfile__input} {...register('image')} />
          <br />
          <span className={styles.editProfile__warning}>{errors?.image && <p>{errors?.image?.message}</p>}</span>
        </div>

        <input
          type="submit"
          className={styles.editProfile__submit}
          name="submit_btn"
          value="Login"

        />
      </form>
    </div>
  );
};

export default withRouter(EditProfile);
