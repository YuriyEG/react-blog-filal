/* eslint-disable */

import React, { useContext, useEffect, useState } from 'react';

import format from 'date-fns/format';
import { ar } from 'date-fns/locale';
import Markdown from 'react-markdown';


import styles from './article.module.css';
import { withRouter } from 'react-router-dom';
import ServiceContext from '../../context';
import Alert from '../Alert';


const Article = ({itemId, history, auth, curUser, setErrorState }) => {


  const [article, setArticle] = useState({});
  const [cur_user, setCur_user] = useState('');
  const [deleteOk, setDeleteOk] = useState(false);
  const [likedFlag, setLikedFlag] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likedList, setLikedList] = useState([]);

  const testService = useContext(ServiceContext);
  useEffect( () => {
      testService.getArticle(itemId, (res) => setArticle(res.article), (err) => console.log(err));
      if( !localStorage.getItem('liked_list')) {
        localStorage.setItem('liked_list', JSON.stringify([]));
      } else {
        let list = localStorage.getItem('liked_list');
        setLikedList(JSON.parse(list));
      }
  }, []);
  useEffect( () => {
      setLikedFlag(article.favorited);
      setLikeCount(article.favoritesCount);
  }, [article])

  useEffect( () => {
    if (curUser.user) {
      setCur_user(curUser.user.username);
    }
  }, [curUser])

  let imageUrl;
  let author = 'no author';
  let date = 'no date';
  if (article.updatedAt) {
    const x = new Date(article.updatedAt);
    date = format(x, 'MMMMMM dd, yyyy');
  }

  // if (article.author) {
    author = article?.author?.username;
  // }

  if (article.author) {
    imageUrl = article.author.image;
  }

 
  
  
 

  const Tag = ({ value }) => {
    return <div className={styles.article__tag}>{value}</div>;
  }

  const deleteHandler = () => {
    setDeleteOk(true);
  }

  const editHandler = () => {
   
    history.push(`/articles/${itemId}/edit`);
  }

  const confirmationHandler = () => {
    testService.deleteArticle(itemId, (res) => {
      setErrorState({status: true, message: 'Статья удалена!'});
      setTimeout(() => {
        setErrorState({status: false, message: '' })
      }, 1500);
      setTimeout(() => {
        history.push('/articles');
      }, 400);
    } , (err) => {
      setErrorState({status: true, message: 'Статья удалена!'});
      setTimeout(() => {
        setErrorState({status: false, message: '' })
      }, 1500);
    });

    setDeleteOk(false);
    history.push('/articles');
    
  }

  const cancelHandler = () => {
    setDeleteOk(false);
  }

  const addToFavorites = () => {
    if (auth.auth) {
          if (!likedFlag) {
      testService.toFavorites(itemId, (res) => console.log('result',res), (err) => console.log('error:', err));
      setLikedFlag(true);
      setLikeCount(() => likeCount + 1)
      let curList = JSON.parse(localStorage.getItem('liked_list'));
      curList.push(itemId);
      localStorage.setItem('liked_list', JSON.stringify(curList));
      setErrorState({status: true, message: 'Добавлено в избранное!'});
      setTimeout(() => {
        setErrorState({status: false, message: '' })
      }, 1500);
    } else {
      testService.unFavorites(itemId, (res) => console.log('result',res), (err) => console.log('error:', err));
      setLikedFlag(false);
      setLikeCount(() => likeCount - 1);
      let curList = JSON.parse(localStorage.getItem('liked_list'));
      let newList = [...curList].filter( node => node !== itemId);
      localStorage.setItem('liked_list', JSON.stringify(newList));
      setErrorState({status: true, message: 'Удалено из избранного!'});
      setTimeout(() => {
        setErrorState({status: false, message: '' })
      }, 1500);
    
    }
    } else {
      setErrorState({status: true, message: 'Вам необходимо авторизоваться!'});
      setTimeout(() => {
        setErrorState({status: false, message: '' })
      }, 1500);
      history.push('/sign-in')
    }

    console.log('getItem', localStorage.getItem('liked_list'))
  }


  
  const markdown = '# Hi, *Pluto*!';
  console.log(<Markdown>{markdown}</Markdown>)
  
  return (
    <div className={styles.article}>
      
      <div className={styles.article__headWrapper}>
            <div className={styles.article__left}>
        <div className={styles.article__title}>
          <span className={styles.article__titleBox}>{article.title}</span>

          <div className={likedFlag ?  styles.article__liked :  styles.article__like} onClick={addToFavorites}></div>
          <div className={styles.article__count}>{likeCount}</div>
        </div>
        <div className={styles.article__tags}>
          {article.tagList?.map((value) => (
            <Tag value={value} key={Math.random()} />
          ))}
        </div>
        <div className={styles.article__description}>
          { article.description }
        </div>
      </div>
      <div className={styles.article__right}>
        <div className={styles.article__profileCard}>
          <div className={styles.article__info}>
            <div className={styles.article__name}>{author}</div>
            <div className={styles.article__date}>{date}</div>
          </div>
          <div className={styles.article__cardIcon} style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: '50% 50%', backgroundSize: '105%', backgroundRepeat: 'no-repeat'}}></div>
        </div>
        { (auth.auth) && (cur_user === author) ? (
        <div className={styles.article__buttonWrapper}>

          <div className={styles.article__dialog} style={deleteOk ? {display: 'block' }: { display: 'none'}}> 
            <div className={styles.article__dialogInside}>
              <div className={styles.article__dialogAngle}>
              </div>
              <div className={styles.article__circle}></div>
              <div className={styles.article__question}>Are you sure to delete this article?</div>
              <div className={styles.article__buttons}>
                <button className={styles.article__buttonNo} onClick={cancelHandler}>No</button>
                <button className={styles.article__buttonYes} onClick={confirmationHandler}>Yes</button>
              </div>
            </div>
          </div>
          <div className={styles.article__deleteButton} onClick={deleteHandler}>Delete</div>
          <div className={styles.article__editButton} onClick={editHandler}>Edit</div>
        </div>
        ) : null }
            
      </div>
      
      </div>
      <div className={styles.article__body}>
        <Markdown>{article.body}</Markdown>
      </div>
      
    </div>
  );
};

export default withRouter(Article);
