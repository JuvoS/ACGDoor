import DemoHeader from "@/layout/DemoHeader";
import AppFooter from "@/layout/AppFooter";

const routes = [
  {
    path: "/",
    name: "Demos",
    label: "主页",
    components: {
      header: DemoHeader,
      default: () => import("./views/"),
      footer: AppFooter,
    },
  },
  {
    path: "/other",
    name: "other",
    label: "其他",
    components: {
      header: DemoHeader,
      default: () => import("./views/other"),
      footer: AppFooter,
    },
  },
];

export default routes;
