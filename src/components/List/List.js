/* eslint-disable */
import { Spin } from 'antd';


import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import ROUTER_PATHS from '../../Paths/Paths';



import ArticleItem from '../ArticleItem';

import styles from './list.module.css';
import ServiceContext from '../../context';


const List = ({history}) => {
  const testService = useContext(ServiceContext);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const dataReceiver = (data) => {
    setArticles(data.articles);
    setTotalPages(Math.ceil(data.articlesCount/5))
 
  }


  useEffect(() => {
    setIsLoading(true);
    testService.getArticles(5, (currentPage-1)*5)
      .then( res => res.json())
      .then( res => {
        setIsLoading(false);
        dataReceiver(res);
      })
      /* eslint-disable */
      .catch( err => {
        setIsLoading(false);
      })
  }, [currentPage]);
  
  
  const articlesList = articles.map((article) => (
        <ArticleItem article={article} key={Math.random()}
          onItemSelected={ (slug) => {
            history.push(`${ROUTER_PATHS.ARTICLES}/${slug}`);
          }}
        />
      ));
  
  return (
    <div className={styles.list}>
            { isLoading ? <Spin size="large" /> : null }
            {  articlesList  }

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
