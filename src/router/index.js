import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          redirect: "/dashboard",
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/dashboard/index.vue"),
        },
        {
          path: "/matching",
          name: "matching",
          component: () => import("../views/matching/index.vue"),
        },
        {
          path: "/resume",
          name: "resume",
          component: () => import("../views/resume/index.vue"),
        },
        {
          path: "/positions",
          name: "positions",
          component: () => import("../views/positions/index.vue"),
        },
        {
          path: "/candidates",
          name: "candidates",
          component: () => import("../views/candidates/index.vue"),
        },
        {
          path: "/interviews",
          name: "interviews",
          component: () => import("../views/interviews/index.vue"),
        },
        {
          path: "/talent-pool",
          name: "talent-pool",
          component: () => import("../views/talent-pool/index.vue"),
        },
        {
          path: "/analytics",
          name: "analytics",
          component: () => import("../views/analytics/index.vue"),
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("../views/settings/index.vue"),
        },
        {
          path: "/ai-settings",
          name: "ai-settings",
          component: () => import("../views/ai-settings/index.vue"),
        },
        // 其他路由可以在对应页面开发完成后再添加
      ],
    },
  ],
});

export default router;
