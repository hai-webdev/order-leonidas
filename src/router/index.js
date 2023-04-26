import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Brand from "@/views/Brand";
import Contact from "@/views/Contact";
import News from "@/views/News";
import NewsDetail from "@/views/News/Detail";
import Identification from "@/views/Identification";
import Illustrate from "@/views/Illustrate";
import IllustrateDetail from "@/views/Illustrate/Detail";
import Product from "@/views/Product";
import ProductDetail from "@/views/Product/Detail";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/brand",
    name: "Brand",
    component: Brand,
    meta: {
      scode: 1,
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      scode: 2,
    },
  },
  {
    path: "/identification",
    name: "Identification",
    component: Identification,
    meta: {
      scode: 6,
    },
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      scode: 3,
    },
  },
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: NewsDetail,
    meta: {
      scode: 3,
    },
  },
  {
    path: "/illustrate",
    name: "Illustrate",
    component: Illustrate,
    meta: {
      scode: 4,
    },
  },
  {
    path: "/illustrate/:id",
    name: "IllustrateDetail",
    component: IllustrateDetail,
    meta: {
      scode: 4,
    },
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: {
      scode: 5,
    },
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    meta: {
      scode: 5,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
