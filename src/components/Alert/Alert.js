import React from 'react';

import styles from './alert.module.css';

const Alert = ({ errorState }) => {
  return (
    <div className={errorState.status ? styles.alert__on : styles.alert__off}>
      <div className={styles.alert__body}>{errorState.message}</div>
    </div>
  );
};

export default Alert;
