import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import TitlePage from './views/TitlePage.vue'
import Profil from './components/Profil.vue'
import Entry from './components/profil/Entry.vue'
import Likes from './components/profil/Likes.vue'
import Followed from './components/profil/Followed.vue'
import Followers from './components/profil/Followers.vue'
import Info from './components/profil/Info.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/TitlePage',
      name: 'title_page',
      component: TitlePage
    },
    {
      path: '/profil',
      component: Profil,
      children:[
        {path:'', component:Entry, name:'profil-entry'},
        {path:'likes', component:Likes, name:'profil-likes'},
        {path:'followed', component:Followed, name:'profil-followed'},
        {path:'followers', component:Followers, name:'profil-followers'},
        {path:'info', component:Info, name:'profil-info'}
      ]
    }
  ]
});
