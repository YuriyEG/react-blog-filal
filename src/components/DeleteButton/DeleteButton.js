/* eslint-disable */
import React from 'react';


import styles from './deleteButton.module.css';

const DeleteButton = ({ value }) => {
  return <button className={styles.deleteButton}>{value}</button>;
};

export default DeleteButton;
