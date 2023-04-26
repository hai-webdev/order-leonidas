<template>
  <div class="footer-container">
    <div class="foot-box">
      <div class="left-layout">
        <button class="btn" @click="showForm = true">高端私人定制</button>
        <div class="company-info">
          <ul class="company-list">
            <li class="company-item" v-for="item in contact" :key="item.id">
              <div class="name">{{ item.title }}</div>
              <div class="info">{{ item.ext_content }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-layout">
        <div class="title">公司地址</div>
        <BaiduMap />
      </div>
    </div>
    <div class="copyright">
      {{ site.copyright }}
      <a href="https://beian.miit.gov.cn/" v-if="site.icp">{{ site.icp }}</a>
    </div>
    <Form v-show="showForm" @closeForm="handleCloseForm" />
  </div>
</template>

<script>
import Form from "@/components/Form";
import { mapState } from "vuex";
import BaiduMap from "@/components/BaiduMap";
export default {
  data() {
    return {
      showForm: false,
    };
  },
  created() {
    this.$store.dispatch("footer/asyncSetData");
  },
  computed: {
    ...mapState("footer", ["contact", "loading"]),
    ...mapState("site", ["site"]),
  },
  methods: {
    handleCloseForm(state) {
      this.showForm = state;
    },
  },
  components: {
    BaiduMap,
    Form,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.footer-container {
  padding-top: 15px;
  background-color: #000;
  .foot-box {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
    .flex(space-between);
    .left-layout {
      padding-top: 20px;
      .btn {
        width: 145px;
        height: 41px;
        background-color: #c80010;
        color: #fff;
        border-radius: 6px;
        border: none;
        outline: none;
        cursor: pointer;
        margin-bottom: 50px;
      }
      .company-list {
        width: 476px;
        .company-item {
          font-size: 14px;
          color: #4b4b4b;
          margin: 20px 0;
          .flex(flex-start,flex-start);
          flex-wrap: wrap;
          .name {
            width: 70px;
          }
          .info {
            width: calc(100% - 70px);
            word-break: break-word;
          }
        }
      }
    }
    .right-layout {
      flex: 1;
      padding-left: 10%;
      .title,
      .baidu-map-container {
        width: 100%;
      }
    }
  }
  .copyright {
    padding: 10px 0;
    text-align: center;
    color: #474747;
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  .footer-container {
    .foot-box {
      padding-bottom: 20px;
      .flex(space-between);
      .left-layout {
        padding-top: 20px;
        .btn {
          margin: 0 auto;
          display: block;
          margin-bottom: 30px;
        }
        .company-list {
          width: 100%;
        }
      }
      .right-layout {
        padding-left: 0;
      }
    }
    .copyright {
      padding: 10px 0;
      text-align: center;
      color: #474747;
      font-size: 13px;
    }
  }
}
</style>