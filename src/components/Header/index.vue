<template>
  <header class="pc-header header-container" v-loading="loading" v-if="isPc">
    <div class="top-layout">
      <router-link to="/" class="logo">
        <img :src="site.logo" :alt="site.title" />
      </router-link>
    </div>
    <div class="bottom-layout">
      <nav class="nav-list">
        <router-link
          class="nav-item"
          v-for="item in nav"
          :key="item.id"
          :to="{
            name: item.link,
          }"
          :exact="item.exact"
          exact-active-class="active"
          >{{ item.name }}</router-link
        >
      </nav>
    </div>
  </header>
  <header class="m-header header-container" v-else>
    <div class="menu-btn" :class="{active}" @click="toggleActive">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <router-link to="/" class="logo">
      <img :src="site.logo" :alt="site.title" />
    </router-link>
  
      <div class="nav-container" :class="{active}">
        <nav class="nav-list">
          <router-link
            class="nav-item"
            v-for="item in nav"
            :key="item.id"
            :to="{
              name: item.link,
            }"
            :exact="item.exact"
            exact-active-class="active"
            >{{ item.name }}</router-link
          >
        </nav>
      </div>

  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: false,
    };
  },
  created() {
    this.$store.dispatch("site/asyncSetData");
    this.$store.dispatch("nav/asyncSetData");
  },
  computed: {
    ...mapState("site", ["site", "loading"]),
    ...mapState("nav", ["nav", "loading"]),
    isPc() {
      const viewWidth = document.body.getBoundingClientRect().width;
      return viewWidth > 768;
    },
  },
  methods:{
    toggleActive(){
      this.active = !this.active;
    }
  },
  watch:{
    $route(){
      this.active = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
@import "~@/styles/var.less";

.header-container.pc-header {
  background-color: #000;
  .top-layout {
    height: 80px;
    .flex();
    .logo {
      height: 50px;
      display: block;
      img {
        height: 100%;
      }
    }
  }
  .bottom-layout {
    height: 64px;
    .nav-list {
      height: 64px;
      .flex();
      .nav-item {
        .flex();
        width: 140px;
        height: 50px;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        &:hover,
        &.active {
          color: @mainColor;
        }
      }
    }
  }
}
.header-container.m-header {
  height: 50px;
  background-color: #000;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
  .flex();
  .menu-btn {
    width: 21px;
    height: 18px;
    top: 50%;
    position: absolute;
    left: 10px;
    margin-top: -9px;
    z-index: 9999;
    .flex();
    flex-direction: column;
    justify-content: space-between;
    span {
      display: block;
      width: 21px;
      height: 2px;
      background-color: #fff;
      transition: 0.6s;
    }
    &.active {
      span {
        background-color: #999;
        height: 1px;
        &:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        &:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
      }
    }
  }
  .logo {
    height: 44px;
    .flex();
    img {
      height: 44px;
    }
  }
  .nav-container {
    position: fixed;
    width: 100%;
    height: 100vh;
    transform: translateY(-100%);
    left: 0;
    top: 0;
    background-color: #fff;
    padding: 50px 15px;
    box-sizing: border-box;
    z-index: 0;
    transition: .6s;
    opacity: 0;
    .nav-list {
      border-top: 1px solid #f3f3f3;
      .nav-item {
        display: block;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        border-bottom: 1px solid #f3f3f3;
        &:hover,
        &.active {
          color: @mainColor;
        }
      }
    }
    &.active{
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>