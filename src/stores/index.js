import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

var ls = new SecureLS();

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  state: {
    isLoading: true,
    error: null,
  },
  _modules: {
      
  },
  get modules() {
      return this._modules;
  },
  set modules(value) {
      this._modules = value;
  },
  mutations: {
    LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    ERROR(state, error) {
      state.error = error;
    },
  },
});
