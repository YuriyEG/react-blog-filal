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

 useEffect( () => {

  if (localStorage.getItem('isAuth')) {
    setAuth(JSON.parse(localStorage.getItem('isAuth')));
  } else {
    localStorage.setItem('isAuth', JSON.stringify({ auth: false }));
    setAuth({ auth: false });
  }
  testService.getCurrentUser((res) => {
    setCurUser(res);

  }, (err) => console.log(err));
 }, [])
  
 
  return (
    <Router>
      <div className={styles.app}>

            <Alert errorState={errorState} />
            
              <Header path={RouterPaths.base} exact auth={auth} setAuth={setAuth} setErrorState={setErrorState} curUser={curUser}  />
              <Switch>
                <Route path={RouterPaths.base}  render={ e => { return <List setErrorState={setErrorState}/> }} exact />
                <Route path={RouterPaths.articles}   render={ e => { return <List setErrorState={setErrorState}/> }} exact />
                <Route path={RouterPaths.articles + `/:id`} render={
                  ({ match }) => {
                  const { id } = match.params;
                  return <Article itemId={id} auth={auth} curUser={curUser} setErrorState={setErrorState} />
                  }} exact />
                <Route path={RouterPaths.signUp} render={ () => <SignUp setErrorState={setErrorState} />} exact/>
        
                <Route path={RouterPaths.signIn} render={ () => {
                  return <SignIn auth={auth} setAuth={setAuth} setErrorState={setErrorState}/>
                }}  exact/>
                <Route path={RouterPaths.profile}
                    render={ () => {
                    return <EditProfile curUser={curUser} setErrorState={setErrorState} />
                    }} />
                <Route path={RouterPaths.newArticle} exact 
                    render={ () => {
                    return <CreateArticle isNew={true} auth={auth} setErrorState={setErrorState} errorState={errorState} />
                    }} />
                <Route path={`/articles/:slug/edit`} render={
       
                ({match, location, history }) => {

                    const { slug } = match.params;
                    console.log(match);
              
                    return <CreateArticle slug={slug} isNew={false} setErrorState={setErrorState} errorState={errorState} />
                }}/>
                <Route render={ () => <h1 style={{ marginTop: '50px', marginLeft: '40%'}}>Page not found!</h1>}/>
              </Switch>

      </div>
    </Router>
  );
};

export default App;
