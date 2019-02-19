import axios from 'axios';
const API_URL = 'http://localhost:4000';

export class APIService {

    constructor() { }

    getLeftData() {
        const url = `${API_URL}/leftMenu/`;
        return axios.get(url).then(response => response.data);
    }

    //vuex yani store.js deki currentTitle alanını set et.
    setCurrentTitle(id) {
        //console.log('bu ne id = ' + id);
        const url = `${API_URL}/getCurrentTitle/${id}`;
        return axios.get(url).then(response => response.data);
    }
    setTitleComments(id,userid,pageNum) {
        const url = `${API_URL}/getTitleComments/${id}/${userid}/${pageNum}`;
        return axios.get(url).then(response => response.data);
    }

    addComment(commentObj) {
        const url = `${API_URL}/addComment/`;
        return axios.post(url, commentObj);
    }

    login(userObj) {
        const url = `${API_URL}/login/`;
        return axios.post(url, userObj);
    }

    likeService(item) {
        const url = `${API_URL}/likeService/`;
        return axios.post(url, item);
    }

    unlikeService(item) {
        const url = `${API_URL}/unlikeService/`;
        return axios.post(url, item);
    }

    favoriteService(item) {
        const url = `${API_URL}/favoriteService/`;
        return axios.post(url, item);
    }

    unfavoriteService(item) {
        const url = `${API_URL}/unfavoriteService/`;
        return axios.post(url, item);
    }

    dislikeService(item) {
        const url = `${API_URL}/dislikeService/`;
        return axios.post(url, item);
    }

    undislikeService(item) {
        const url = `${API_URL}/undislikeService/`;
        return axios.post(url, item);
    }

    repostService(item) {
        const url = `${API_URL}/repostService/`;
        return axios.post(url, item);
    }

    unrepostService(item) {
        const url = `${API_URL}/unrepostService/`;
        return axios.post(url, item);
    }

    getMainFlow(id,pg) {
        const url = `${API_URL}/getMainFlow/${id}/${pg}`;
        return axios.get(url).then(response => response.data);
    }

    deleteEntry(item) {
        const url = `${API_URL}/deleteEntry/`;
        return axios.post(url, item);
    }

    aboutService(userid) {
        //console.log("API userid: " + userid);
        const url = `${API_URL}/aboutService/${userid}`;
        return axios.get(url).then(response => response.data);
    } 

    followerService(userid) {
        console.log("API userid: " + userid);
        const url = `${API_URL}/followerService/${userid}`;
        return axios.get(url).then(response => response.data);
    } 

    followedService(userid) {
        console.log("API userid: " + userid);
        const url = `${API_URL}/followedService/${userid}`;
        return axios.get(url).then(response => response.data);
    } 

    getMyFavoriteEtries(userid,pg) {
        console.log("API userid: " + userid);
        const url = `${API_URL}/getMyFavoriteEtries/${userid}/${pg}`;
        return axios.get(url).then(response => response.data);
    } 

    getMyEntriesForProfilPage(userid,pg) {
        console.log("API userid: " + userid);
        console.log("pg: " + pg);
        const url = `${API_URL}/getMyEntriesForProfilPage/${userid}/${pg}`;
        return axios.get(url).then(response => response.data);
    } 

    getEntryCountForCurrentTitle(titleid) {
        const url = `${API_URL}/getEntryCountForCurrentTitle/${titleid}`;
        return axios.get(url).then(response => response.data);
    } 

    test(item) {
        const url = `${API_URL}/test/`;
        return axios.post(url, item);
    }

    getPersonalInformation(userId){
        const url = `${API_URL}/getPersonalInformation/${userId}`;
        return axios.get(url).then(response => response.data);
    }

    setPersonalInformation(item) {
        const url = `${API_URL}/setPersonalInformation/`;
        return axios.post(url, item);
    }

    getHobbiesAndInterests(userId){
        const url = `${API_URL}/getHobbiesAndInterests/${userId}`;
        return axios.get(url).then(response => response.data);
    }

    setHobbiesAndInterests(item) {
        const url = `${API_URL}/setHobbiesAndInterests/`;
        return axios.post(url, item);
    }

    register(userObj) {
        const url = `${API_URL}/register/`;
        return axios.post(url, userObj);
    }

    userAdviceService(item) {
        console.log("UserAdvice API çalıştı !");
        const url = `${API_URL}/userAdviceService/`;
        return axios.post(url, item);
    }

    followService(item) {
        const url = `${API_URL}/followService/`;
        return axios.post(url, item);
    }
    unfollowService(item) {
        const url = `${API_URL}/unfollowService/`;
        return axios.post(url, item);
    }

}