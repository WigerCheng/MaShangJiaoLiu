import { createStore } from 'vuex'
export default createStore({
  state: {
    token: sessionStorage.getItem('token') || null,
    currentUserId: sessionStorage.getItem('userId') || null,
    topicId: null
  },
  mutations: {
    login(state, payload) {
      let token = payload.token;

      state.token = token;

      sessionStorage.token = token;
    },
    logout(state) {
      sessionStorage.removeItem('token');
      state.token = null;
    },
    setTopicId(state, topicId) {
      state.topicId = topicId;
    }
  },
  getters: {
    isUserLogin(state) {
      return state.token !== null
    }
  },
  actions: {
  },
  modules: {
  }
})
