/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import DeleteButton from '../DeleteButton';
import AddTagButton from '../AddTagButton';
import SendButton from '../SendButton';

import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ServiceContext from '../../context';
import { CreateArticleSchema } from '../../YUP';
import { yupResolver } from '@hookform/resolvers/yup';


import styles from './createArticle.module.css';
import { ConsoleSqlOutlined } from '@ant-design/icons';


const CreateArticle = ({history, errorState, setErrorState, isNew, slug }) => {

  const [tags, setTags] = useState([]);
  const [curTag, setCurTag] = useState('');
  const testService = useContext(ServiceContext);
  const [article, setArticle] = useState(null);

  useEffect( () => {
    testService.getArticle(slug, (res) => setArticle(res.article), (err) => console.log(err));
    console.log('otrabotalo');
}, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(CreateArticleSchema)
  });

  const onSubmit = (data) => {
      
      
      let sendedTags = [];
      tags.forEach( tag => sendedTags.push(tag.value));

    
      let dataWithTags = { ...data, tagList: sendedTags };
      if (isNew) {
        testService.createArticle(
        dataWithTags,
        (res) => {
  
          setErrorState({status: true, message: 'Статья успешно добавлена!'});
          setTimeout(() => {
            setErrorState({status: false, message: '' })
          }, 1500);

        } ,

        (err) => {
          setErrorState({status: true, message: 'Ошибка при выполнении запроса!'});
          setTimeout(() => {
            setErrorState({status: false, message: '' })
          }, 2000);
        }
      );
      } else {
        testService.editArticle(
          slug,
          dataWithTags,
          
          (res) => {
    
            setErrorState({status: true, message: 'Статья отредактирована!'});
            setTimeout(() => {
              setErrorState({status: false, message: '' })
            }, 1500);
  
          } ,
  
          (err) => {
            setErrorState({status: true, message: 'Ошибка при отправке!'});
            setTimeout(() => {
              setErrorState({status: false, message: '' })
            }, 2000);
          }
  
        );
      }
      
      reset();
      setTags([]);

      history.push('/articles');
        
  };

  const addTag = (e) => {

    e.preventDefault();
    if (curTag.length ) {
      setTags([{ value: curTag, id: Date.now() }, ...tags]);
    setCurTag('');
    }
  }

  const deleteTagHandler = (e) => {
    e.preventDefault();
    console.log(e);
    let newTags = [...tags].filter( tag => tag.id != e.target.id );
    setTags(newTags);
   

  }
  useEffect( () => {
    console.log('tags', tags);
  }, [tags])

  useEffect( () => {
    if (article) {
          console.log(article);
    let receivedTags = [];
    article.tagList?.forEach( tag => {
      receivedTags.push( { id: Math.random()*Date.now(), value: tag })
    });
    setTags(receivedTags);

    document.getElementById('title')
    .value = article.title;
  document.getElementById('description')
    .value = article.description;
  document.getElementById('body')
    .value = article.body;

   console.log(article.tagList);
    }

    

  }, [article] )

  return (
    <div className={styles.createArticle}>
      <form className={styles.createArticle__form} onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.createArticle__title}>{ isNew ? 'Create new article' : 'Edit article'}</div>
        <div className={styles.createArticle__label}>
          <div className={styles.createArticle__description}>Title</div>

          <input id='title' className={styles.createArticle__input}
                      {...register('title')} />
                      <br />
          <span className={styles.createArticle__warning}>{errors?.title && <p>{errors?.title?.message}</p>}</span>
        </div>
        <div className={styles.createArticle__label}>
          <div className={styles.createArticle__description}>Short description</div>

          <input id='description' className={styles.createArticle__input} 
                        {...register('description')}
          />
                  <br />
          <span className={styles.createArticle__warning}>{errors?.description && <p>{errors?.description?.message}</p>}</span>
        </div>

        <div className={styles.createArticle__label}>
          <div className={styles.createArticle__description}>Text</div>

          <textarea id='body' className={styles.createArticle__area} width="874px" type="text" 
                        {...register('body')}
          />
                 <br />
          <span className={styles.createArticle__warning}>{errors?.body && <p>{errors?.body?.message}</p>}</span>
        </div>
 


        <div className={styles.createArticle__description}>Tags</div>
        <div onClick={deleteTagHandler}>
                 { 
          tags.map( (tag) => (<div className={styles.createArticle__tagWrapper}>
          <input className={styles.createArticle__tagInput} value={tag.value} />
          <button id={tag.id} className={styles.deleteButton}>Delete</button>
        </div>))
        } 
        </div>

        <div className={styles.createArticle__tagWrapper}>
          <input value={curTag} className={styles.createArticle__tagInput} onChange={(e) => setCurTag(e.target.value)}/>
          <button className={styles.addTagButton} onClick={(e) => addTag(e)}>Add tag</button>
        </div>

        <button type="submit" className={styles.sendButton}>Send</button>
        
      </form>
    </div>
  );
};

export default withRouter(CreateArticle);
