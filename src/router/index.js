import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';

import Home from '../views/home';
import Register from '../views/register';
import Login from '../views/login';
import NewTopic from '../views/new';
import TopicDetail from '../views/detail';
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
    component: NewTopic,
    meta: { needLogin: true }
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
    meta: { needLogin: true },
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
  if (to.meta.needLogin !== true) return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    window.sessionStorage.setItem("toRouter", to.path);
    ElMessage({
      type: "error",
      message: "你还未登录"
    });
    return next('/login');
  } else {
    window.sessionStorage.removeItem("toRouter");
  }
  next();
});

export default router
