import { createRouter, createWebHistory } from 'vue-router';
import $ from 'jquery';

import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NewTopic from '../views/new';
import TopicDetail from '../views/TopicDetail.vue';
import Manager from '../views/manager';
import UserManager from '../views/manager/UserManager.vue';
import TagManager from '../views/manager/TagManager.vue';
import TopicManager from '../views/manager/TopicManager.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/new',
    name: 'NewTopic',
    component: NewTopic
  },
  {
    path: '/detail/:topicId',
    name: 'TopicDetail',
    component: TopicDetail
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
    children: [
      {
        path: '/user',
        name: 'UserManager',
        component: UserManager
      },
      {
        path: '/tag',
        name: 'TagManager',
        component: TagManager
      },
      {
        path: '/topic',
        name: 'TopicManager',
        component: TopicManager
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const paths = ['/login', '/register', '/'];
  let inPaths = $.inArray(to.path, paths);
  if (inPaths !== -1) return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有获得token,跳转到、/login页面
  if (!tokenStr) {
    return next('/login');
  }
  next();
});

export default router
