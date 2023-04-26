import getSite from "@/api/getSite";
export default {
  namespaced: true,
  state: {
    site: {},
    loading: true,
  },
  mutations: {
    setData(state, payload) {
      state.site = payload;
    },
    setStatus(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async asyncSetData(ctx) {
      ctx.commit("setStatus", true);
      const resp = await getSite();
      ctx.commit("setData", resp.data);
      ctx.commit("setStatus", false);
    },
  },
  modules: {},
};
