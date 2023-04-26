<template>
  <div class="contact-container" v-loading="loading">
    <Banner v-if="scodeInfo" :src="scodeInfo.pic" :title="scodeInfo.name" />
    <div class="contact-content">
      <div class="title">{{ data.title }}</div>
      <div class="content" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import { mapState } from "vuex";
export default {
  components: {
    Banner,
  },
  created() {
    if (!this.data || !this.scodeInfo) {
      this.$store.dispatch("contact/asyncSetData", this.$route.meta.scode);
    }
  },
  computed: {
    ...mapState("contact", ["data", "scodeInfo", "loading"]),
  },
};
</script>

<style lang="less" scoped>
.contact-content {
  width: 90%;
  margin: 0 auto;
  max-width: 1440px;
  padding: 60px 0;
  display: flex;
  justify-content: space-between;
  color: #fff;
  border-bottom: 1px solid #fff;
  .title {
    width: 30%;
    font-size: 24px;
  }
  .content {
    width: 70%;
    font-size: 20px;
    line-height: 1.7;
  }
}
@media screen and (max-width: 768px) {
  .contact-content {
    width: 96%;
    padding: 10px 0;
    flex-wrap: wrap;
    .title {
      width: 100%;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .content {
      width: 100%;
      font-size: 14px;
      padding: 10px 0 0;
      line-height: 1.7;
      border-top: 1px solid #fff;
    }
  }
}
</style>