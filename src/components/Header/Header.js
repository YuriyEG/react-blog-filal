import React, { useEffect, useState } from 'react';
import '../../assets/default.jpg';
import { Link, withRouter } from 'react-router-dom';

import styles from './header.module.css';

const Header = ({ auth, setAuth, curUser, setErrorState }) => {
  const [userName, setUserName] = useState('no Name');
  const [imageUrl, setImageUrl] = useState('https://i.ibb.co/n7qPrMB/Lost-via-domus-soundtrack.jpg');

  const logOut = () => {
    localStorage.setItem('isAuth', JSON.stringify({ auth: false }));
    setAuth({ auth: false });
    setErrorState({ status: true, message: 'Вы вышли из своего профиля!' });
    setTimeout(() => {
      setErrorState({ status: false, message: '' });
    }, 1500);
  };

  useEffect(() => {
    if (curUser.user) {
      setUserName(curUser.user.username);
      setImageUrl(curUser.user.image);
    }
  }, [curUser]);

  return (
    <div className={styles.header}>
      <Link className={styles.header__title} style={{ color: 'rgba(0, 0, 0, 0.85)', textDecoration: 'none' }} to="/">
        Realworld Blog
      </Link>
      {auth.auth ? (
        <Link className={styles.createArticleButton} to="/new-article">
          Create article
        </Link>
      ) : null}
      {!auth.auth ? (
        <div className={styles.signInButton}>
          <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }} to="/sign-in">
            Sign In
          </Link>
        </div>
      ) : null}
      {auth.auth ? (
        <Link className={styles.header__profileBox} to="/profile">
          <div className={styles.header__name}>{userName}</div>
          <div
            className={styles.header__logo}
            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: '100%' }}
          ></div>
        </Link>
      ) : null}

      {!auth.auth ? (
        <div className={styles.signUpButton}>
          <Link style={{ textDecoration: 'none', color: 'rgba(82, 196, 26, 1)' }} to="/sign-up">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={styles.signUpButton} onClick={logOut}>
          <Link style={{ textDecoration: 'none', color: 'rgba(82, 196, 26, 1)' }} to="/sign-in">
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
