import api from "@/api";
export default {
  namespaced: true,
  state: {
    data: {},
    scodeInfo: null,
    loading: true,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
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
      document.title = scodeInfo.data.name;
      const content = await api.getContent({ scode });
      ctx.commit("setData", content.data);
      ctx.commit("setStatus", false);
    },
  },
  modules: {},
};
