<template>
  <div class="home-container" v-loading="loading">
    <div class="video-box">
      <img class="video" :src="data.home_gif" v-if="data.home_gif" />
      <video
        class="video"
        ref="video"
        :src="data.sp"
        autoplay
        muted
        v-else
      ></video>
    </div>
    <div class="product-container">
      <div class="title-box">
        <div class="title">轻奢腕錶</div>
        <div class="subtitle">探索我們的腕錶系列</div>
      </div>
      <div
        class="recommend-product"
        :style="{ backgroundImage: `url(${data.t1})` }"
      >
        <ul class="product-list">
          <li
            class="product-item"
            v-for="item in recommendProduct"
            :key="item.id"
          >
            <router-link
              class="product-box"
              :to="{
                name: 'ProductDetail',
                params: {
                  id: item.id,
                },
              }"
            >
              <img :src="item.ico" :alt="item.title" />
              <p>{{ item.title }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <ul class="no-recommend-product-list">
        <li
          class="product-item"
          v-for="item in noRecommendProduct"
          :key="item.id"
        >
          <router-link
            class="product-box"
            :to="{
              name: 'ProductDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img :src="item.ico" :alt="item.title" />
            <p>{{ item.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <ul class="brand-list" v-if="brand.pics">
      <li
        class="brand-item"
        v-for="(pic, i) in brand.pics.split(',').slice(0, 3)"
        :key="i"
      >
        <img :src="pic" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: 1,
      num: 10,
      productList: [],
    };
  },
  async created() {
    this.$store.dispatch("label/asyncSetData");
    if (!this.data || !this.scodeInfo) {
      this.$store.dispatch("brand/asyncSetData", 1);
    }
    this.productList = await this.$api.getList({
      scode: 5,
      page: this.page,
      num: this.num,
    });
    document.title = this.siteTitle;
  },
  mounted() {
    this.$refs.video.play();
  },
  computed: {
    ...mapState("label", ["data", "loading"]),
    ...mapState({
      brand: (state) => state.brand.data,
    }),
    ...mapState({
      siteTitle: (state) => {
        const title = state.site.site.title;
        document.title = title;
        return title;
      },
    }),
    recommendProduct() {
      if (!this.productList.total) {
        return [];
      }
      const resp = this.productList.data.filter((item) => {
        return Number(item.isrecommend);
      });
      return resp;
    },
    noRecommendProduct() {
      if (!this.productList.total) {
        return [];
      }
      const resp = this.productList.data.filter((item) => {
        return !Number(item.isrecommend);
      });
      return resp;
    },
  },
  methods: {},
};
</script>

<style scoped lang="less">
@import "~@/styles/mixins.less";
.home-container {
  background-color: #000;
  .video-box {
    width: 100%;
    height: 700px;
    display: block;
    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    video {
      width: 100%;
      height: 100%;
      display: block;
      .bgCenter();
    }
  }
}
.product-container {
  background-color: #000;
  padding: 50px 0;
  .recommend-product {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .title-box {
    width: 95%;
    max-width: 1080px;
    margin: 0 auto;
    .title {
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .subtitle {
      font-size: 12px;
      color: #e60012;
    }
  }
  .product-list {
    width: 75%;
    margin: 0 auto;
    justify-content: center;
    .flex();
    .product-item {
      width: 50%;
      .product-box {
        img {
          max-width: 100%;
        }
        p {
          font-size: 14px;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
}
.no-recommend-product-list {
  width: 80%;
  max-width: 1440px;
  padding: 50px 0;
  margin: 0 auto;
  .flex(flex-start,flex-start);
  .product-item {
    width: 20%;
    padding: 50px 30px;
    box-sizing: border-box;
    .product-box {
      img {
        max-width: 100%;
        margin: 0 auto;
        transition: 0.6s;
      }
      p {
        text-align: center;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &:hover {
      .product-box {
        img {
          transform: scale(1.15);
        }
      }
    }
  }
}
.brand-list {
  width: 80%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 0 50px;
  .flex(flex-start,flex-start);
  .brand-item {
    width: calc(100% / 3);
    padding-top: calc(100% / 3 * 0.75);
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
      top: 0;
      left: 0;
      transition: 0.6s;
    }
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .home-container {
    .video-box {
      height: 56vw;
    }
  }
  .product-container {
    background-color: #000;
    padding: 5vw 0;
    .title-box {
      .title {
        font-size: 22px;
      }
    }
    .product-list {
      width: 100%;
      .flex();
      .product-item {
        width: 50%;
        .product-box {
          p {
            font-size: 12px;
          }
        }
      }
    }
  }
  .no-recommend-product-list {
    width: 100%;
    max-width: 1440px;
    padding: 30px 0;
    margin: 0 auto;
    .flex(flex-start,flex-start);
    .product-item {
      width: 50%;
      padding: 10px;
      .product-box {
        p {
          font-size: 12px;
        }
      }
    }
  }
  .brand-list {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 5px;
    box-sizing: border-box;
    .flex(flex-start,flex-start);
    .brand-item {
      width: calc((100% - 30px) / 3);
      margin: 0 5px;
      padding-top: calc((100% - 30px) / 3 * 0.75);
    }
  }
}
</style>