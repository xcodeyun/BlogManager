import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import JOIN from "./../views/join.vue";
import HOME from "./../views/home.vue";
import INDEX from "./../views/homeChildren/index.vue";
import ADDWORD from "./../views/homeChildren/addWord.vue";
import UPDATAWORD from "./../views/homeChildren/updataWord.vue";
import FINDWORD from "./../views/homeChildren/findWord.vue";
import DELETEWORD from "./../views/homeChildren/deleteWord.vue";
import FINDUSER from "./../views/homeChildren/findUser.vue";
import UPDATAUSER from "./../views/homeChildren/updataUser.vue";
import DELETEUSER from "./../views/homeChildren/deleteUser.vue";
import SET from "./../views/homeChildren/set.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/join",
    name: "join",
    component: JOIN
  },
  {
    path: "/home",
    name: "home",
    component: HOME,
    children: [
      {
        path: "/home/",
        redirect: "/home/index"
      },
      {
        path: "/home/index",
        component: INDEX
      },
      {
        path: "/home/addWord",
        component: ADDWORD
      },
      {
        path: "/home/updataWord",
        component: UPDATAWORD
      },
      {
        path: "/home/findWord",
        component: FINDWORD
      },
      {
        path: "/home/deleteWord",
        component: DELETEWORD
      },
      {
        path: "/home/findUser",
        component: FINDUSER
      },
      {
        path: "/home/updataUser",
        component: UPDATAUSER
      },
      {
        path: "/home/deleteUser",
        component: DELETEUSER
      },
      {
        path: "/home/set",
        component: SET
      },
    ]
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, form, next) => {
  if (to.path == "/join") {
    window.sessionStorage.removeItem("xmanager-login");
    window.localStorage.removeItem("xmanager-login");
  }
  let isLoginS = window.sessionStorage.getItem("xmanager-login");
  let isLoginL = window.localStorage.getItem("xmanager-login");
  isLoginS = typeof isLoginS == "string" ? isLoginS : "";
  isLoginL = typeof isLoginL == "string" ? isLoginL : "";
  if (!isLoginS && !isLoginL && to.path != "/join") next({ path: "/join" });
  else next();
})

export default router;
