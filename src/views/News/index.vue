<template>
  <div class="news-container" v-loading="loading">
    <Banner v-if="scodeInfo" :src="scodeInfo.pic" :title="scodeInfo.name" />
    <div class="main-content">
      <List
        v-if="newsList && scodeInfo"
        :list="newsList"
        :name="scodeInfo.name"
      />
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import List from "./Components/List.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      newsList: [],
      total: 0,
      page: 1,
      num: 10,
    };
  },
  components: {
    Banner,
    List,
  },
  async created() {
    if (!this.scodeInfo) {
      this.$store.dispatch("news/asyncSetData", this.$route.meta.scode);
    }
    const resp = await this.$api.getList({
      scode: this.$route.meta.scode,
      page: this.page,
      num: this.num,
    });
    if(!resp){
      return ;
    }
    this.newsList = resp.data;
    this.total = resp.dotal;
    document.title = this.$store.state.news.scodeInfo.name;
  },
  computed: {
    ...mapState("news", ["scodeInfo", "loading"]),
  },
};
</script>

<style lang="less" scoped>
.main-content {
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  padding: 50px;
}
@media screen and (max-width: 768px) {
  .main-content {
    width: 100%;
    padding: 10px 0;
  }
}
</style>