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
      let userId = payload.user.userId;

      state.token = token;
      state.currentUserId = userId;

      sessionStorage.token = token;
      sessionStorage.userId = userId;
    },
    logout(state) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      state.token = null;
      state.currentUserId = null;
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
