/* eslint-disable */

import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom';
import { Navigate } from "react-router-dom";



import Header from '../Header';
import CreateArticle from '../CreateArticle';
import List from '../List';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import SignUp from '../SignUp';
import Article from '../Article';
import Alert from '../Alert';
import ServiceContext from '../../context';
import styles from './App.module.css';
import RouterPaths from '../../Paths/Paths';


const App = () => {

 let testService = useContext(ServiceContext);
 
 const [auth, setAuth ] = useState({ auth: false });

 const [curUser, setCurUser] = useState({});
 const [errorState, setErrorState] = useState({status: false, message: ''})

 const showMessage = (message) => {
    setErrorState( { status: true, message: message });
    setTimeout(() => {
      setErrorState( { status: false, message: '' })
    }, 2000);
 }

 useEffect( () => {

  if (localStorage.getItem('isAuth')) {
    setAuth(JSON.parse(localStorage.getItem('isAuth')));
  } else {
    localStorage.setItem('isAuth', JSON.stringify({ auth: false }));
    setAuth({ auth: false });
  }
  testService.getCurrentUser().then( res => res.json()).then( res => setCurUser(res)).catch(err => {
    showMessage('Ошибка! ' + err.message);

      })
 }, [])
  
 
  return (
    <Router>
      <div className={styles.app}>

            <Alert errorState={errorState} />
            
              <Header path={RouterPaths.base} exact auth={auth} setAuth={setAuth} showMessage={showMessage} curUser={curUser}  />
              <Switch>
              <Route path={RouterPaths.articles}  render={ e => { return <List showMessage={showMessage} /> }} exact />
                <Route path={RouterPaths.base}  render={ e => { return <List showMessage={showMessage} /> }} exact />
                <Route path={RouterPaths.articles + `/:id`} render={
                  ({ match }) => {
                  const { id } = match.params;
                  return <Article itemId={id} auth={auth} curUser={curUser} showMessage={showMessage} />
                  }} exact />
                <Route path={RouterPaths.signUp} render={ () => <SignUp auth={auth} showMessage={showMessage} />} exact/>
        
                <Route path={RouterPaths.signIn} render={ () => {
                  return <SignIn auth={auth} setAuth={setAuth} showMessage={showMessage} />
                }}  exact/>
                <Route path={RouterPaths.profile}
                    render={ () => {
                    return <EditProfile auth={auth} curUser={curUser} showMessage={showMessage} />
                    }} />
                <Route path={RouterPaths.newArticle} exact 
                    render={ () => {
                    return <CreateArticle isNew={true} curUser={curUser} auth={auth}  showMessage={showMessage} />
                    }} />
                <Route path={`${RouterPaths.articles}/:slug/edit`} render={
       
                ({match, location, history }) => {

                    const { slug } = match.params;
                    return <CreateArticle auth={auth} slug={slug} curUser={curUser} isNew={false} showMessage={showMessage} errorState={errorState} />
                }}/>
                <Route render={ () => <h1 style={{ marginTop: '50px', marginLeft: '40%'}}>Page not found!</h1>}/>
              </Switch>

      </div>
    </Router>
  );
};

export default App;
