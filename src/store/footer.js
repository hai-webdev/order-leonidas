import api from "@/api";
export default {
  namespaced: true,
  state: {
    contact: [],
    loading: true,
  },
  mutations: {
    setData(state, payload) {
      state.contact = payload;
    },
    setStatus(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async asyncSetData(ctx) {
      ctx.commit("setStatus", true);
      const data = await api.getList({scode:7});
      ctx.commit("setData", data.data);
      ctx.commit("setStatus", false);
    },
  },
  modules: {},
};
