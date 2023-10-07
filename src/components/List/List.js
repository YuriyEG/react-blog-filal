/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ServiceAPI from '../../ServiceAPI/ServiceAPI';
import { withRouter } from 'react-router-dom';


import ArticleItem from '../ArticleItem';

import styles from './list.module.css';
const service = new ServiceAPI();

const List = ({history}) => {
  const [articles, setArticles] = useState([1, 3, 4]);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const dataReceiver = (data) => {
    setArticles(data.articles);

    setTotalPages(Math.ceil(data.articlesCount/5))
 
  }


  useEffect(() => {
    service.getArticles((res) => dataReceiver(res), (err) => console.log(err), 5, (currentPage-1)*5);
  }, [currentPage]);
  
  return (
    <div className={styles.list}>
      {articles.map((article) => (
        <ArticleItem article={article} key={Math.random()*Date.now() }
          onItemSelected={ (slug) => {
            console.log(slug); 
            history.push(`/articles/${slug}`);
          }}
        />
      ))}
      <div className={styles.list__pagination}>
        <Pagination defaultCurrent={0}
          pageSize={1}
          total={totalPages}
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          style={{ display: 'inline-block'}}
        />
      </div>
    </div>
  );
};

export default withRouter(List);
