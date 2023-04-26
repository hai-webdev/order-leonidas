import getNav from "@/api/getNav";
export default {
  namespaced: true,
  state: {
    nav: {},
    loading: true,
  },
  mutations: {
    setData(state, payload) {
      state.nav = payload;
    },
    setStatus(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async asyncSetData(ctx) {
      ctx.commit("setStatus", true);
      const resp = await getNav();
      const list = resp.data.map((item) => {
        const list = {
          name: item.name,
          id: Number(item.id),
          link: item.filename,
          scode: item.scode,
          exact: item.scode == 3 || item.scode == 4,
        };
        return list;
      });
      const data = [{ name: "首页", id: 0, link: "Home", exact: true }, ...list];
      ctx.commit("setData", data);
      ctx.commit("setStatus", false);
    },
  },
  modules: {},
};
