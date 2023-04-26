<template>
  <div class="illustrate-detail-container" v-loading="loading">
    <h1 class="title">{{ rs.title }}</h1>
    <div class="video-box">
      <video
        v-if="rs.ext_sp"
        :src="rs.ext_sp"
        autoplay
        class="videoplayer"
        ref="videoPlayer"
        muted
        @click="changeVideo"
        :controls="!playing"
        @ended="handleEnded"
        @play="handlePlay"
      ></video>
      <img
        :src="playImg"
        alt=""
        class="play-btn"
        :class="playing ? 'pause' : 'play'"
        @click="changeVideo"
      />
    </div>
    <main class="main-content">
      <div class="cont-title">产品说明</div>
      <div class="content" v-html="rs.content"></div>
    </main>
  </div>
</template>

<script>
import playImg from "@/assets/images/icon/player.png";
export default {
  data() {
    return {
      rs: {},
      loading: true,
      playImg,
      playing:false,
    };
  },
  async created() {
    const resp = await this.$api.getContent({ id: this.$route.params.id });
    this.rs = resp.data;
    this.loading = false;
  },
  methods:{
    changeVideo(){
        const videoDom = this.$refs.videoPlayer;
        if(videoDom.paused){
            this.playing = true;
            videoDom.play();
        } else{
              this.playing = false;
              videoDom.pause();
        }
        console.log(videoDom.paused);
    },
    handlePlay(){
        this.playing = true;
    },
    handleEnded(){
        this.playing = false;
    }
  }
};
</script>

<style lang="less" scoped>
.illustrate-detail-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  .title {
    font-size: 24px;
    color: #666;
    padding: 20px 0;
    font-weight: 400;
  }
  .video-box {
    margin-bottom: 30px;
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &::after{
        content:"";
        position: absolute;
        width: 100%;
        height: calc(100% - 80px);
        left: 0;
        top: 0;
        z-index: 9;
        background-color: rgba(0,0,0,0);
    }
    .videoplayer {
      width: 100%;
    }
    .play-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 56px;
      height: 56px;
      margin-left: -28px;
      margin-top: -28px;
      z-index: 999;
      object-fit: none;
      transform: translateY(-300px);
      transition: 1s;
      opacity: 0;
      &.play {
        object-position: center -5px;
      }
      &.pause {
        object-position: center -82px;
      }
    }
    &:hover {
      .play-btn {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }

  .main-content {
    .cont-title {
      font-size: 18px;
      color: #a9a9a9;
      margin-bottom: 15px;
    }
    .content {
      color: #a9a9a9;
      font-size: 14px;
      line-height: 1.8;
      img {
        max-width: 100%;
      }
    }
  }
}
.video-js .vjs-duration,
.vjs-no-flex .vjs-duration {
  display: block;
}

.video-js .vjs-current-time,
.vjs-no-flex .vjs-current-time {
  display: block;
}

.video-js .vjs-time-control {
  display: block;
}
</style>