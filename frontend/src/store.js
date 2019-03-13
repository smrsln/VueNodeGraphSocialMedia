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
    profile:{
      userId:'',
      userName:'',
      name:'',
      profile_pics:'',
      rank:'',
      type:'1'//1 kendi profilim, 2 başkasının profili eğer type == 2 ise takip et butonu çıksın
    },
    test:{},
    pageNum:1
  },
  getters:{
    titleComments: state => state.titleComments,
    currentTitleId: state => state.currentTitle.id,
    titleEntryCount: state => state.titleEntryCount,
    pageNum: state=> state.pageNum,
    profilUserId:state=>state.profile.userId,
    profilUserName:state=>state.profile.userName,
    profilName:state=>state.profile.name,
    profilPics:state=>state.profile.profile_pics,
    profilUserType:state=>state.profile.type,
    profilUserRank:state=>state.profile.rank
  },
  mutations: {
    setCurrentTitle(state, payload) {
        state.currentTitle = payload.currentTitleData;
        state.titleEntryCount = payload.entryCount;
        state.titleComments = payload.titleCommentsData;
    },
    setPageNumber(state,payload) {
      state.pageNum = payload.pgNum;
    },
    setProfile(state,payload){
      state.profile.userId = payload.userId;
      state.profile.userName = payload.userName;
      state.profile.name = payload.name;
      state.profile.profile_pics = payload.profile_pics;
      state.profile.rank = payload.rank;
      state.profile.type = payload.type;
    }
  },
  actions: {
    setCurrentTitle(context, payload) {
      context.commit('setCurrentTitle', payload);
    },
    setPageNumber(context, payload) {
      context.commit('setPageNumber',payload);
    },
    setProfile(context, payload) {
      context.commit('setProfile',payload);
    }
  }
});