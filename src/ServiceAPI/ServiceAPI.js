/* eslint-disable */

class ServiceApi {
  constructor() {
    this.baseUrl = 'https://blog.kata.academy/api/';
    this.forUsers = 'users/';
    this.user = 'user/';
    this.forArticles = 'articles/';
  }

  createUser(obj, onResponse = this.defaultResponce, onError = this.defaultError) {
    fetch(this.baseUrl + this.forUsers, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: obj }),
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  getArticles(onResponse, onError, limit = 5, offset = 0) {
    fetch(`${this.baseUrl + this.forArticles}?limit=${limit}&&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .then((err) => onError(err));
  }

  async createArticle(
    receivedArticle,
    onResponse = () => console.log('Не передан колбэк для респонса'),
    onError = () => console.log('не передан колбэк для ошибок')
  ) {
    console.log('Передаем ', receivedArticle);
    const token = localStorage.getItem('token');
    fetch(this.baseUrl + this.forArticles, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: receivedArticle }),
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async getArticle(
    itemId,
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('Получили: ', itemId);
    const token = localStorage.getItem('token');
    fetch(this.baseUrl + this.forArticles + itemId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async deleteArticle(
    itemId,
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('Получили: ', itemId);
    const token = localStorage.getItem('token');

    fetch(this.baseUrl + this.forArticles + itemId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async toFavorites(
    slug,
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('Получили: ', slug);
    const token = localStorage.getItem('token');

    fetch(`${this.baseUrl + this.forArticles + slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async unFavorites(
    slug,
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('Получили: ', slug);
    const token = localStorage.getItem('token');

    fetch(`${this.baseUrl + this.forArticles + slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async editArticle(
    slug,
    receivedArticle,
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('Получили: ', slug, receivedArticle);
    const token = localStorage.getItem('token');

    fetch(this.baseUrl + this.forArticles + slug, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: receivedArticle }),
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async getCurrentUser(
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('sdfsf');
    const token = localStorage.getItem('token');

    fetch(this.baseUrl + 'user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async updateCurrentUser(
    obj,
    onResponse = () => console.log('Не передан колбэк для Респонса'),
    onError = () => console.log('Не передан колбэк для Ошибки')
  ) {
    console.log('sdfsf');
    const token = localStorage.getItem('token');

    fetch(this.baseUrl + 'user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => onResponse(res))
      .catch((err) => onError(err));
  }

  async login(email, password, onResponse, onError) {
    console.table( email, password);
    fetch( this.baseUrl + 'users/login/', {
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
    })
    .then((res) => res.json())
    .then((res) => onResponse(res))
    .catch((err) => onError(err));
  }
}

export default ServiceApi;
