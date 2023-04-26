<template>
  <div class="illustrate-container" v-loading="loading">
    <Banner
      v-if="scodeInfo && scodeInfo.pic"
      :src="scodeInfo.pic"
      :title="scodeInfo.name"
    />
    <main class="main-content" v-if="scodeInfo && productList">
      <h1 class="sort-title">{{ scodeInfo.name }}</h1>
      <ul class="product-list">
        <li class="product-item" v-for="pro in productList" :key="pro.id">
          <router-link
            :to="{
              name: 'IllustrateDetail',
              params: {
                id: pro.id,
              },
            }"
            class="product-box"
          >
            <div class="img">
              <img :src="pro.ico" :alt="pro.title" />
            </div>
            <p>{{ pro.title }}</p>
          </router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import { mapState } from "vuex";

export default {
  data() {
    return {
      productList: [],
      total: 0,
      page: 1,
      num: 9,
    };
  },
  components: {
    Banner,
  },
  async created() {
    if (!this.scodeInfo) {
      this.$store.dispatch("illustrate/asyncSetData", this.$route.meta.scode);
    }
    const resp = await this.$api.getList({
      scode: this.$route.meta.scode,
      page: this.page,
      num: this.num,
    });
    if (!resp) {
      return;
    }
    document.title = this.$store.state.illustrate.scodeInfo.name;
    this.total = resp.total;
    this.productList = resp.data;
  },
  computed: {
    ...mapState("illustrate", ["scodeInfo", "loading"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.main-content {
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  padding: 50px;
  .sort-title {
    font-size: 24px;
    color: #dedede;
    font-weight: 400;
    margin-bottom: 15px;
  }
  .product-list {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .product-item {
      margin: 0 10px 20px;
      width: calc(100% / 3 - 20px);
      position: relative;
      overflow: hidden;
      .img {
        width: 100%;
        padding-top: 100%;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          .bgCenter();
          transition: 0.3s;
        }
      }
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        color: #fff;
      }
      &:hover {
        .img {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .main-content {
    width: 100%;
    padding: 0;
    .sort-title {
      font-size: 16px;
    }
    .product-list {
      .product-item {
        margin: 0 0 20px;
        width: 100%;
        p {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>