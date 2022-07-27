import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '/@views/NotFound.vue';
import Home from '/@views/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  { path: '/:catchAll(.*)+', name: 'NotFound', component: NotFound },
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
