import Vue from "vue";
import Vuex from "vuex";
import site from "./site";
import nav from "./nav";
import label from "./label";
import brand from "./brand";
import contact from "./contact";
import news from "./news";
import illustrate from "./illustrate";
import product from "./product";
import footer from "./footer";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    site,
    nav,
    label,
    brand,
    contact,
    news,
    illustrate,
    product,
    footer
  },
  strict: true,
});
