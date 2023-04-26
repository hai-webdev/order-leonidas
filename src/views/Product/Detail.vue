<template>
  <div class="product-detail-container" v-loading="loading">
    <main class="main-content" v-if="rs">
      <div class="left-layout">
        <div class="img"><img :src="rs.ico" :alt="rs.title" /></div>
      </div>
      <div class="right-layout">
        <div class="title">{{ rs.title }}</div>
        <div class="price">{{ rs.ext_jg }}</div>
        <ul class="params-list" v-if="rs.ext_cs">
          <li
            class="params-item"
            v-for="(param, i) in rs.ext_cs.split(',')"
            :key="i"
          >
            <div class="title">{{ param.split("|")[0] }}</div>
            <div class="info">{{ param.split("|")[1] }}</div>
          </li>
        </ul>
        <div class="reserve" @click="showForm = true">立即预约</div>
      </div>
    </main>
    <section class="detail-content">
      <div class="title">
        <span>產品詳情</span>
      </div>
      <div class="content" v-html="rs.content"></div>
    </section>
    <Form v-show="showForm" @closeForm="handleCloseForm" />
  </div>
</template>

<script>
import Form from "@/components/Form";
export default {
  data() {
    return {
      rs: {},
      loading: true,
      playing: false,
      showForm: false,
    };
  },
  components: {
    Form,
  },
  async created() {
    const resp = await this.$api.getContent({ id: this.$route.params.id });
    this.rs = resp.data;
    document.title = resp.data.title;
    this.loading = false;
  },
  methods: {
    handleCloseForm(state) {
      this.showForm = state;
    },
    handlePlay() {
      this.playing = true;
    },
    handleEnded() {
      this.playing = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.product-detail-container {
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px 0;
  .main-content {
    .flex(center,flex-start);
    flex-direction: row;
    margin-bottom: 50px;
  }
  .left-layout,
  .right-layout {
    width: 50%;
  }
  .left-layout {
    .flex();
    .img {
      width: 90%;
      padding-top: 90%;
      position: relative;
      border: 1px solid #eee;
      box-sizing: border-box;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .right-layout {
    padding: 30px;
    box-sizing: border-box;
    .title {
      font-size: 20px;
      color: #000;
      margin-bottom: 35px;
    }
    .price {
      font-size: 24px;
      background-color: #f7f7f7;
      font-weight: bold;
      color: #2b2b2b;
      padding: 30px;
      box-sizing: border-box;
      width: 100%;
      max-width: 350px;
      .flex();
    }
    .params-list {
      width: 90%;
      max-width: 350px;
      margin-bottom: 30px;
      .params-item {
        border-bottom: 1px solid #f5f5f5;
        padding: 12px 0;
        &:last-child {
          border-bottom: none;
        }
        .flex();
        .title,
        .info {
          margin: 0;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
        }
        .title {
          width: 120px;
          font-weight: bold;
          color: #333;
        }
        .info {
          width: calc(100% - 120px);
          color: #666;
        }
      }
    }
    .reserve {
      width: 200px;
      height: 42px;
      border: 1px solid #000;
      border-radius: 22px;
      font-size: 16px;
      .flex();
      cursor: pointer;
    }
  }
  .detail-content {
    padding: 30px;
    box-sizing: border-box;
    .title {
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      height: 56px;
      line-height: 56px;
      span {
        .flex();
        border-left: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;
        width: 160px;
        height: 100%;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          top: 0;
          left: 0;
          background-color: #000;
        }
      }
    }
    .content {
      padding: 30px 0;
      img {
        width: auto;
        max-width: 100%;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .product-detail-container {
    width: 100%;
    .left-layout,
    .right-layout {
      width: 100%;
    }
    .left-layout {
      .flex();
      .img {
        width: 100%;
        padding-top: 100%;
        border: none;
      }
    }
    .right-layout {
      padding: 30px 0;
      box-sizing: border-box;
      .title {
        font-size: 20px;
        color: #000;
        padding: 0 10px;
        margin-bottom: 15px;
      }
      .price {
        font-size: 20px;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        max-width: none;
        background-color: #fff;
        padding-bottom: 15px;
        border-bottom: 15px solid #f9f9f9;
      }
      .params-list {
        width: 100%;
        max-width: none;
        margin-bottom: 0;
        .params-item {
          border-bottom: 1px solid #f5f5f5;
          padding: 5px;
          .flex();
          flex-wrap: inherit;
          .title,
          .info {
            margin: 0;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
          }
          .title {
            width: 80px;
            font-weight: bold;
            color: #333;
          }
          .info {
            width: calc(100% - 80px);
            color: #666;
          }
        }
      }
      .reserve {
        width: 100%;
        height: 42px;
        border: none;
        background-color: #2b2b2b;
        color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        bottom: 0;
        border-radius: 0;
        font-size: 16px;
        .flex();
        cursor: pointer;
      }
    }
    .main-content {
      margin-bottom: 0;
    }
    .detail-content {
      padding: 0;
      box-sizing: border-box;
      .title {
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        height: 44px;
        line-height: 44px;
        span {
          .flex();
          border-left: 1px solid #f5f5f5;
          border-right: 1px solid #f5f5f5;
          width: 100%;
          height: 100%;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            top: auto;
            bottom: 0;
            left: 0;
            background-color: #000;
          }
        }
      }
      .content {
        padding: 10px;
        img {
          width: auto;
          max-width: 100%;
        }
      }
    }
  }
}
</style>