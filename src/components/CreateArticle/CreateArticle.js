/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';


import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import ServiceContext from '../../context';
import { CreateArticleSchema } from '../../YUP';
import { yupResolver } from '@hookform/resolvers/yup';


import styles from './createArticle.module.css';
import RouterPaths from '../../Paths/Paths';

const CreateArticle = ({history, errorState, setErrorState, isNew, slug }) => {

  const [tags, setTags] = useState([]);
  const [curTag, setCurTag] = useState('');
  const testService = useContext(ServiceContext);
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');


  useEffect( () => {
    if (!isNew) {
          testService.getArticle(slug)
    .then( res => res.json())
    .then( res => setArticle(res.article))
    .catch( err => {
      setErrorState( { status: true, message: 'Ошибка ! ' + err.message });
      setTimeout(() => {
        setErrorState( { status: false, message: '' })
      }, 1000);
    })
    }

  
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

        testService.createArticle(dataWithTags)
        .then( res => {
          return res.json()
        })
        .then( res => {
          setErrorState({status: true, message: 'Статья успешно добавлена!'});
          setTimeout(() => {
            setErrorState({status: false, message: '' })
          }, 1500);
          history.push(RouterPaths.articles);
        })
        .catch( err => {
          setErrorState({status: true, message: 'Ошибка при выполнении запроса!'});
          setTimeout(() => {
            setErrorState({status: false, message: '' })
          }, 2000);
        }
          )


      } else {
        testService.editArticle(
          slug,
          dataWithTags)
          .then( res => {
            return res.json()
          })
          .then( res => {
            setErrorState({status: true, message: 'Статья отредактирована!'});
            setTimeout(() => {
              setErrorState({status: false, message: '' })
            }, 1500);
            reset();
            setTags([]);
      
            history.push('/articles');
          })
          .catch( err => {
            setErrorState({status: true, message: 'Ошибка при отправке!'});
            setTimeout(() => {
              setErrorState({status: false, message: '' })
            }, 2000);
          })

      }
      

        
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
    if (article && !isNew) {
    let receivedTags = [];
    article.tagList?.forEach( tag => {
      receivedTags.push( { id: Math.random()*Date.now(), value: tag })
    });
    setTags(receivedTags);
    setTitle(article.title);
    setDescription(article.description);
    setBody(article.body);


    }

    

  }, [article] )

  return (
    <div className={styles.createArticle}>
      <form className={styles.createArticle__form} onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.createArticle__title}>{ isNew ? 'Create new article' : 'Edit article'}</div>
        <div className={styles.createArticle__label}>
          <div className={styles.createArticle__description}>Title</div>

          <input className={styles.createArticle__input}
                      {...register('title')} value={title} onChange={e => setTitle(e.target.value)}/>
                      
                      <br />
          <span className={styles.createArticle__warning}>{errors?.title && <p>{errors?.title?.message}</p>}</span>
        </div>
        <div className={styles.createArticle__label}>
          <div className={styles.createArticle__description}>Short description</div>

          <input  className={styles.createArticle__input} 
                        {...register('description')}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
          />
                  <br />
          <span className={styles.createArticle__warning}>{errors?.description && <p>{errors?.description?.message}</p>}</span>
        </div>

        <div className={styles.createArticle__label}>
          <div className={styles.createArticle__description}>Text</div>

          <textarea className={styles.createArticle__area} width="874px" type="text" 
                        {...register('body')}
                        value={body}
                        onChange={e => setBody(e.target.value)}
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
