import getLabel from "@/api/getLabel";
export default {
  namespaced: true,
  state: {
    data: {},
    loading: true,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setStatus(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async asyncSetData(ctx) {
      ctx.commit("setStatus", true);
      const resp = await getLabel();
      ctx.commit("setData", resp.data);
      ctx.commit("setStatus", false);
    },
  },
  modules: {},
};
