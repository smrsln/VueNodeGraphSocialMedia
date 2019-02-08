import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {
  APIService
} from "./APIService";
const apiService = new APIService();

Vue.use(Vuex)

export default new Vuex.Store({
  
  strict: true,
  plugins: [
  ],
  state: {
    titleComments: [],
    titleEntryCount : 0,
    currentTitle: {},
    test:{},
    pageNum:1
  },
  getters:{
    titleComments: state => state.titleComments,
    currentTitleId: state => state.currentTitle.id,
    titleEntryCount: state => state.titleEntryCount,
    pageNum: state=> state.pageNum
  },
  mutations: {
    setCurrentTitle(state, payload) {
        state.currentTitle = payload.currentTitleData;
        state.titleEntryCount = payload.entryCount;
        state.titleComments = payload.titleCommentsData;
    },
    setPageNumber(state,payload) {
      state.pageNum = payload.pgNum;
    }
  },
  actions: {
    setCurrentTitle(context, payload) {
      context.commit('setCurrentTitle', payload);
    },
    setPageNumber(context, payload) {
      context.commit('setPageNumber',payload);
    }
  }
});