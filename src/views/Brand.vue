<template>
  <div class="brand-container" v-loading="loading">
    <Banner v-if="scodeInfo" :src="scodeInfo.pic" :title="scodeInfo.name" />
    <template v-if="data">
      <ul class="info-list">
        <li class="info-item">
          <div class="num">{{ data.ext_s1 }}</div>
          <div class="data">{{ data.ext_w1 }}</div>
        </li>
        <li class="info-item">
          <div class="num">{{ data.ext_s2 }}</div>
          <div class="data">{{ data.ext_w2 }}</div>
        </li>
        <li class="info-item">
          <div class="num">{{ data.ext_s3 }}</div>
          <div class="data">{{ data.ext_w3 }}</div>
        </li>
        <li class="info-item">
          <div class="num">{{ data.ext_s4 }}</div>
          <div class="data">{{ data.ext_w4 }}</div>
        </li>
      </ul>
      <div class="content" v-html="data.content"></div>
      <div class="pic-box">
        <div class="pic-title">品牌實力</div>
        <ul class="pic-list" v-if="data.pics">
          <li
            class="pic-item"
            v-for="(pic, i) in data.pics.split(',')"
            :key="i"
          >
            <img :src="pic" />
          </li>
        </ul>
      </div>
    </template>
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
      this.$store.dispatch("brand/asyncSetData", this.$route.meta.scode);
    }
      document.title = this.data.title;
  },
  computed: {
    ...mapState("brand", ["data", "scodeInfo", "loading"]),
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixins.less";
.brand-container {
  background-color: #262525;
  padding-bottom: 100px;
}
.info-list {
  max-width: 1322px;
  width: 90%;
  margin: 0 auto;
  padding: 28px;
  .flex(space-between);
  .info-item {
    width: 25%;
    color: #fff;
    text-align: center;
    .num {
      font-size: 30px;
    }
    .data {
      font-size: 14px;
    }
  }
}
.content {
  max-width: 830px;
  width: 90%;
  margin: 0 auto;
  color: #fff;
  padding: 50px 0 100px;
}
.pic-box {
  text-align: center;
  .pic-title {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 30px;
  }
  .pic-list {
    .flex(center);
    .pic-item {
      width: 186px;
      height: 130px;
      margin: 0 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        .bgCenter();
        transition: 0.6s;
      }
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .brand-container {
    padding-bottom: 30px;
  }
  .info-list {
    width: 95%;
    padding: 10px;
    .info-item {
      width: 50%;
      color: #fff;
      text-align: center;
      padding: 10px 0;
      .num {
        font-size: 22px;
      }
      .data {
        font-size: 12px;
      }
    }
  }
  .content {
    width: 95%;
    margin: 0 auto;
    color: #fff;
    padding: 30px 0;
  }
  .pic-box {
    .pic-title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .pic-list {
      padding: 0 5px;
      .flex(center);
      .pic-item {
        width: calc(50% - 10px);
        padding-top: calc((50% - 10px) * 0.8);
        margin: 0 5px 10px;
        height: 0;
        overflow: hidden;
        position: relative;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        &:hover {
          img {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style>