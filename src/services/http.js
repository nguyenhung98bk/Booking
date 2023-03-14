import axios from 'axios';
import store from '../stores';

/**
 * Http client using Axios
 */
export class Http {
  constructor() {
    const auth = store.state.auth;
    this.instance = axios.create({
      baseURL: `${window.location.origin}/api`,
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
        'Authorization': 'Bearer ' + auth.token,
        'X-USER-ID': auth.user_id
      }
    });

    return this.init();
  }

  init() {
    this.instance.interceptors.response.use(undefined, async error => {
      // redirect to auth page if get unauthorized status
      if (error.response.status === 401) {
        store.commit('SET_TOKEN', '');
        store.commit('SET_ROLE', null);
        store.commit('SET_USER_ID', null);
        store.commit('SET_LOGIN_OWNER_FLAG', false);
        location.reload();
      }
      // redirect to LP if get 404 and specific error code
      if (error.response.status === 404) {
        window.location.href = '/not_found';
      }
      return Promise.reject(error);
    });
    return this.instance;
  }
}

/**
 * Create instant, which represent response object
 * @param {Object} [response] - axios response object
 */
export class ResponseWrapper {
  constructor(response) {
    this.response = response.data;
    this.status = response.status;
    this.axios_response = response;
  }
}

/**
 * Create instant, which represent error object
 * @param {Object} [error] - axios error object
 */
export class ApiError extends Error {
  constructor(error) {
    super();
    this.response = error.response ? error.response.data : {};
    this.status = error.response ? error.response.status : null;
    this.axios_error = error;
  }
}
