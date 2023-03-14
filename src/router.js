import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './pages/Index.vue';
import Login from './pages/Login.vue';
import Profile from './pages/Profile.vue';
import UserLayout from './layout/UserLayout.vue';
import AdminLayout from './layout/AdminLayout.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        { path: '/', meta: { title: 'landing', hideForAuth: true }, name: 'landing', component: Index },
        { path: '/login', meta: { title: 'login', hideForAuth: true }, name: 'login', component: Login },
      ]
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

const DEFAULT_TITLE = 'Booking Hotel';

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
});

export default router;
