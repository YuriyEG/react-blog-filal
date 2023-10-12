/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useContext } from 'react';


import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ServiceContext from '../../context';
import { withRouter } from 'react-router-dom';

import styles from './editArticle.module.css';


const EditArticle = ({slug, history, setErrorState, mode }) => {



  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [curTag, setCurTag] = useState('');

  const [article, setArticle] = useState({});

  const testService = useContext(ServiceContext);

  useEffect( () => {
      testService.getArticle(slug, (res) => setArticle(res.article), (err) => console.log(err));
      console.log('otrabotalo');
  }, []);

  useEffect( () => {
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
    

  }, [article] )





  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: ['default'],
    },
  });

  const onSubmit = (data) => {
      
      console.log(data);
      let sendedTags = [];
      tags.forEach( tag => sendedTags.push(tag.value));

    
      let dataWithTags = { ...data, tagList: sendedTags };



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
    
    let newTags = [...tags].filter( tag => tag.id != e.target.id );
    setTags(newTags);

  }
  useEffect( () => {
    console.log('tags', tags);
  }, [tags])

  return (
    <div className={styles.editArticle}>
      <form className={styles.editArticle__form} onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.editArticle__title}>Edit article</div>
        <div className={styles.editArticle__label}>
          <div className={styles.editArticle__description}>Title</div>

          <input className={styles.editArticle__input}
              id='title'
                      {...register('title', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов',
              },
            })} />
        </div>
        <div className={styles.editArticle__label}>
          <div className={styles.editArticle__description}>Short description</div>

          <input className={styles.editArticle__input}
              id='description'
                        {...register('description', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 4, message: 'Минимум 4 символа' },
              maxLength: {
                value: 100,
                message: 'Максимум 100 символов',
              },
            })}
          />
        </div>
        <div className={styles.editArticle__label}>
          <div className={styles.editArticle__description}>Text</div>

          <textarea className={styles.editArticle__area} width="874px" type="text" 
              id='body'
                        {...register('body', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 10, message: 'Минимум 10 символов' },
              maxLength: {
                value: 1000,
                message: '1000',
              },
            })}
          />
        </div>


        <div className={styles.editArticle__description}>Tags</div>
        <div onClick={deleteTagHandler}>
                 { 
          tags.map( (tag) => (<div className={styles.editArticle__tagWrapper}>
          <input className={styles.editArticle__tagInput} value={tag.value} />
          <button id={tag.id} className={styles.deleteButton}>Delete</button>
        </div>))
        } 
        </div>

        <div className={styles.editArticle__tagWrapper}>
          <input value={curTag} className={styles.editArticle__tagInput} onChange={(e) => setCurTag(e.target.value)}/>
          <button className={styles.addTagButton} onClick={(e) => addTag(e)}>Add tag</button>
        </div>

        <button type="submit" className={styles.sendButton}>Send</button>
        
      </form>
    </div>
  );
};

export default withRouter(EditArticle);
