import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '/@views/NotFound.vue';
import Home from '/@views/Home.vue';
import Login from '/@views/Login.vue';
import AdminMain from '/@views/AdminMain.vue';
import UserWorkPage from '/@views/UserWorkPage.vue';
import UserList from '/@components/user/UserList.vue';
import UserReg from '/@components/user/UserReg.vue';
import UserModify from '/@components/user/UserModify.vue';
import AdminMainView from '/@components/AdminMainView.vue';

import { advancePositionWithMutation } from '@vue/compiler-core';

const routes = [
  {
    path: '/',
    component: Home,
  },
  { path: '/:catchAll(.*)+', name: 'NotFound', component: NotFound },
  {
    path: '/login',
    name : 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name : 'AdminMain',
    component: AdminMain,
  },
  {
    path: '/admin/user/list',
    name : 'UserList',
    component: UserList,
  },
  {
    path: '/admin/user/register',
    name : 'UserReg',
    component: UserReg,
  },
  {
    path: '/admin/user/modify/:user_id',
    name : 'UserModify',
    component: UserModify,
  },
  {
    path: '/admin/view',
    name : 'AdminMainView',
    component: AdminMainView,
  },
  {
    path: '/admin/user/workpage/:user_id',
    name : 'UserWorkPage',
    component: UserWorkPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to, _from) => {
  // console.log(to, _from);
});

export default router;
