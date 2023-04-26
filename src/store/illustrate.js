import api from "@/api";
export default {
  namespaced: true,
  state: {
    scodeInfo: null,
    loading: true,
  },
  mutations: {

    setScodeInfo(state, payload) {
      state.scodeInfo = payload;
    },
    setStatus(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async asyncSetData(ctx, scode) {
      ctx.commit("setStatus", true);
      const scodeInfo = await api.getScodeInfo(scode);
      ctx.commit("setScodeInfo", scodeInfo.data);
      ctx.commit("setStatus", false);
    },
  },
  modules: {},
};
