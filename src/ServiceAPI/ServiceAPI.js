import { Component } from 'react';

class ServiceApi extends Component {
  constructor() {
    super();
    this.baseUrl = 'https://blog.kata.academy/api/';
    this.forUsers = 'users/';
    this.user = 'user/';
    this.forArticles = 'articles/';
  }

  createUser(obj) {
    return fetch(this.baseUrl + this.forUsers, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: obj }),
    });
  }

  async getArticles(limit = 5, offset = 0) {
    return fetch(`${this.baseUrl + this.forArticles}?limit=${limit}&&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  }

  async createArticle(receivedArticle) {
    const token = localStorage.getItem('token');
    return fetch(this.baseUrl + this.forArticles, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: receivedArticle }),
    });
  }

  async getArticle(itemId) {
    const token = localStorage.getItem('token');
    return fetch(this.baseUrl + this.forArticles + itemId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  async deleteArticle(itemId) {
    const token = localStorage.getItem('token');

    return fetch(this.baseUrl + this.forArticles + itemId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  async toFavorites(slug) {
    const token = localStorage.getItem('token');

    return fetch(`${this.baseUrl + this.forArticles + slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  async unFavorites(slug) {
    const token = localStorage.getItem('token');
    return fetch(`${this.baseUrl + this.forArticles + slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  async editArticle(slug, receivedArticle) {
    const token = localStorage.getItem('token');
    return fetch(this.baseUrl + this.forArticles + slug, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: receivedArticle }),
    });
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    return fetch(`${this.baseUrl}user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  async updateCurrentUser(obj) {
    const token = localStorage.getItem('token');

    return fetch(`${this.baseUrl}user/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(obj),
    });
  }

  async login(email, password) {
    return fetch(`${this.baseUrl}users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
  }
}

export default ServiceApi;
