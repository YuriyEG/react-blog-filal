import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

import ArticleItem from '../ArticleItem';
import RouterPaths from '../../Paths/Paths';
import ApiContext from '../../context';

import styles from './list.module.css';

const List = ({ history, setErrorState }) => {
  const testService = useContext(ApiContext);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  /* eslint-disable-next-line */
  const [error, setError] = useState('');

  const dataReceiver = (data) => {
    setArticles(data.articles);
    setTotalPages(Math.ceil(data.articlesCount / 5));
  };

  useEffect(() => {
    testService
      .getArticles(5, (currentPage - 1) * 5)
      .then((res) => {
        if (!res.ok) {
          setErrorState({ status: true, message: `${res.status} Ошибка!` });
        }
        return res.json();
      })
      .then((res) => {
        dataReceiver(res);
      })
      .catch((err) => {
        setErrorState({ status: true, message: err.message });
        setTimeout(() => {
          setErrorState({ state: false, message: '' });
        }, 1000);
      });
  }, [currentPage]);

  return (
    <div className={styles.list}>
      {articles.map((article) => (
        <ArticleItem
          article={article}
          key={articles.indexOf(article)}
          onItemSelected={(slug) => {
            history.push(`${RouterPaths.articles}/${slug}`);
          }}
        />
      ))}
      <div className={styles.list__pagination}>
        <Pagination
          defaultCurrent={0}
          pageSize={1}
          total={totalPages}
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          style={{ display: 'inline-block' }}
        />
      </div>
    </div>
  );
};

export default withRouter(List);
