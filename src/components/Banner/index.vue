<template>
  <div class="banner-container">
    <img :src="src" :alt="title" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.banner-container {
  height: 350px;
  img {
    width: 100%;
    height: 100%;
    .bgCenter();
  }
}
</style>