export default function (defaultVal = null, nullScode = false) {
  return {
    data() {
      let data = {};
      if (!nullScode) {
        data = {
          loading: true,
          scodeInfo: null,
          data: defaultVal,
        };
      } else {
        data = {
          loading: true,
          data: defaultVal,
        };
      }
      return data;
    },
    async created() {
      if (!nullScode) {
        const scodeInfo = await this.$api.getScodeInfo(this.$route.meta.scode);
        this.scodeInfo = scodeInfo.data;
      }
      this.data = await this.fetchData();
      this.loading = false;
    },
  };
}
