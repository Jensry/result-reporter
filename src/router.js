import Vue from "vue";
import Router from "vue-router";
import Report from "@/components/Report";
import Confirmation from "@/components/Confirmation";
import Results from "@/components/Results";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Report",
      component: Report
    },
    {
      path: "/confirmation",
      name: "Confirmation",
      component: Confirmation
    },
    {
      path: "/results",
      name: "Results",
      component: Results
    }
  ]
});
