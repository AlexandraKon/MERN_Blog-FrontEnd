import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { isAuthSelector, logout } from '../../redux/slices/auth';


export const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log?')){
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ALEXANDRA BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Write an article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create an account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
