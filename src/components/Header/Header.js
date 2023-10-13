import React, { useEffect, useState } from 'react';
import '../../assets/default.jpg';
import { Link, withRouter } from 'react-router-dom';

import RouterPaths from '../../Paths/Paths';

import styles from './header.module.css';

const Header = ({ auth, setAuth, curUser, showMessage }) => {
  const [userName, setUserName] = useState('no Name');
  const [imageUrl, setImageUrl] = useState('https://i.ibb.co/n7qPrMB/Lost-via-domus-soundtrack.jpg');

  const logOut = () => {
    localStorage.setItem('isAuth', JSON.stringify({ auth: false }));
    setAuth({ auth: false });
    showMessage('Вы вышли со своего профиля!');
  };

  useEffect(() => {
    if (curUser.user) {
      setUserName(curUser.user.username);
      setImageUrl(curUser.user.image);
    }
  }, [curUser]);

  return (
    <div className={styles.header}>
      <Link
        className={styles.header__title}
        style={{ color: 'rgba(0, 0, 0, 0.85)', textDecoration: 'none' }}
        to={RouterPaths.base}
      >
        Realworld Blog
      </Link>
      {auth.auth ? (
        <Link className={styles.createArticleButton} to={RouterPaths.newArticle}>
          Create article
        </Link>
      ) : null}
      {!auth.auth ? (
        <div className={styles.signInButton}>
          <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.85)' }} to={RouterPaths.signIn}>
            Sign In
          </Link>
        </div>
      ) : null}
      {auth.auth ? (
        <Link className={styles.header__profileBox} to={RouterPaths.profile}>
          <div className={styles.header__name}>{userName}</div>
          <div
            className={styles.header__logo}
            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: '100%' }}
          ></div>
        </Link>
      ) : null}

      {!auth.auth ? (
        <div className={styles.signUpButton}>
          <Link style={{ textDecoration: 'none', color: 'rgba(82, 196, 26, 1)' }} to={RouterPaths.signUp}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={styles.signUpButton} onClick={logOut}>
          <Link style={{ textDecoration: 'none', color: 'rgba(82, 196, 26, 1)' }} to={RouterPaths.signIn}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default withRouter(Header);
