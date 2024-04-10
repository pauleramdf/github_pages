import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: () => import("@/views/HomePageView.vue"),
    },
  ],
});

export default router;
