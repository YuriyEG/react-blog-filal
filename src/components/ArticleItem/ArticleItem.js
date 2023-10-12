import React, { useState } from 'react';
import format from 'date-fns/format';

import styles from './articleItem.module.css';

const ArticleItem = ({ article, onItemSelected }) => {
  const [likedFlag, setLikedFlag] = useState(false);

  async function getLikedStatus() {
    const liked = await JSON.parse(localStorage.getItem('liked_list'));
    const slug = await article.slug;
    const iAmLiked = await liked.includes(String(slug));
    setLikedFlag(iAmLiked);
  }

  getLikedStatus();

  let imageUrl;
  let author = 'no author';
  let date = 'no date';
  if (article.updatedAt) {
    const x = new Date(article.updatedAt);
    date = format(x, 'MMMMMM dd, yyyy');
  }

  if (article.author) {
    author = article.author.username;
  }

  if (article.author) {
    imageUrl = article.author.image;
  }

  const Tag = ({ value }) => {
    return <div className={styles.articleItem__tag}>{value}</div>;
  };

  return (
    <div className={styles.articleItem} onClick={() => onItemSelected(article.slug)}>
      <div className={styles.articleItem__left}>
        <div className={styles.articleItem__title}>
          <span className={styles.articleItem__titleBox}>{article.title}</span>

          <div className={likedFlag ? styles.articleItem__liked : styles.articleItem__like}></div>
          <div className={styles.articleItem__count}>{article.favoritesCount}</div>
        </div>
        <div className={styles.articleItem__tags}>
          {article.tagList?.map((value) => (
            <Tag value={value} key={Math.random()} />
          ))}
        </div>
        <div className={styles.articleItem__description}>{article.description}</div>
      </div>
      <div className={styles.articleItem__right}>
        <div className={styles.articleItem__profileCard}>
          <div className={styles.articleItem__info}>
            <div className={styles.articleItem__name}>{author}</div>
            <div className={styles.articleItem__date}>{date}</div>
          </div>
          <div
            className={styles.articleItem__cardIcon}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: '50% 50%',
              backgroundSize: '105%',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
