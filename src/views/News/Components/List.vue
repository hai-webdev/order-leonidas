<template>
  <div class="list-container">
    <h2 class="sort-title">{{ name }}</h2>
    <ul class="news-list">
      <li class="news-item" v-for="item in list" :key="item.id">
        <router-link
          :to="{
            name: 'NewsDetail',
            params: {
              id: item.id,
            },
          }"
          class="news-box"
        >
          <div class="img" v-if="item.ico">
            <img :src="item.ico" :alt="item.title" />
          </div>
          <div class="text">
            <div class="title-box">
              <div class="title">{{ item.title }}</div>
              <div class="date">{{ item.date }}</div>
            </div>
            <div class="desc">{{ item.description }}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.list-container {
  .sort-title {
    font-size: 24px;
    color: #dedede;
    font-weight: 400;
    margin-bottom: 15px;
  }
  .news-list {
    background-color: #fff;
    box-sizing: border-box;
    .news-item {
      padding: 0 20px;
      transition: 0.4s;
      .news-box {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        .flex(space-between, flex-start);
        .img {
          width: 350px;
          height: 200px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            .bgCenter();
            transition: 0.4s;
          }
        }
        .text {
          width: calc(100% - 380px);
          padding: 10px 0;
          padding-right: 10px;
          box-sizing: border-box;
          .title-box {
            .flex(space-between);
            margin-bottom: 20px;
            .title {
              color: #000;
            }
            .date {
              color: #999;
              font-size: 15px;
            }
          }
          .desc {
            font-size: 14px;
            line-height: 1.7;
            text-align: justify;
          }
        }
      }
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        .news-box {
          .img {
            img {
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .list-container {
    .sort-title {
      font-size: 18px;
      margin-bottom: 10px;
      padding-left: 10px;
    }
    .news-list {
      padding: 0 15px;
      .news-item {
        padding: 10px 0;
        .news-box {
          padding: 10px 0;
          .img {
            width: 125px;
            height: auto;
          }
          .text {
            width: calc(100% - 135px);
            padding: 0;
            padding-right: 0;
            box-sizing: border-box;
            .title-box {
              .flex(space-between);
              margin-bottom: 5px;
              .title {
                color: #000;
                font-size: 14px;
                margin-bottom: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical; /*设置对齐模式*/
                -webkit-line-clamp: 2; /*设置多行的行数，示例为2行*/
              }
              .date {
                font-size: 12px;
              }
            }
            .desc {
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical; /*设置对齐模式*/
              -webkit-line-clamp: 2; /*设置多行的行数，示例为2行*/
            }
          }
        }
        &:hover {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          .news-box {
            .img {
              img {
                transform: scale(1.2);
              }
            }
          }
        }
      }
    }
  }
}
</style>