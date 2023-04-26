<template>
  <div class="detail-container">
    <Banner v-if="scodeInfo" :src="scodeInfo.pic" :title="scodeInfo.name" />
    <main class="main-content" v-if="data">
      <h1 class="title">{{ data.title }}</h1>
      <div class="info">
        <span class="date">{{ data.date }}</span>
        <div class="author">{{ data.author }}</div>
      </div>
      <div class="content" v-html="data.content"></div>
    </main>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import { mapState } from "vuex";
import fetchData from "@/mixins/fetchData";
export default {
  mixins: [fetchData({}, true)],
  components: {
    Banner,
  },
  methods: {
    async fetchData() {
      const resp = await this.$api.getContent({ id: this.$route.params.id });
      document.title = resp.data.title;
      return resp.data;
    },
  },
  computed: {
    ...mapState("news", ["scodeInfo"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.main-content {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 0;
  .title {
    font-size: 24px;
    color: #a9a9a9;
    font-weight: 400;
    margin-bottom: 36px;
  }
  .info {
    margin-bottom: 24px;
    font-size: 14px;
    color: #999;
    .flex(flex-start);
    .date {
      margin-right: 20px;
    }
  }
  .content {
    border-top: 1px solid #ebebeb;
    padding: 30px 0;
    color: #666;
    font-size: 14px;
    line-height: 2.5;
    border-bottom: 1px dashed #ebebeb;
  }
}
@media screen and (max-width: 768px) {
  .main-content {
    width: 95%;
    padding: 20px 0;
    .title {
      font-size: 24px;
      color: #a9a9a9;
      font-weight: 400;
      margin-bottom: 36px;
    }
    .info {
      margin-bottom: 24px;
      font-size: 14px;
      color: #999;
      .flex(flex-start);
      .date {
        margin-right: 20px;
      }
    }
    .content {
      border-top: 1px solid #ebebeb;
      padding: 30px 0;
      color: #666;
      font-size: 14px;
      line-height: 2.5;
      border-bottom: 1px dashed #ebebeb;
    }
  }
}
</style>
<style lang="less">
.content {
  img {
    height: auto !important;
  }
}
</style>