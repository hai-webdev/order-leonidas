<template>
  <div class="video-player-container">
    <video ref="videoPlayer" id="videoplayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  created() {
    this.$nextTick(() => {
      this.player = videojs(this.$refs.videoPlayer, this.options);
      const player = videojs("videoplayer_html5_api");
      player.ready(function () {
        let _this = this;
        _this.playbackRate(parseFloat(4));
      });
    });
  },
  mounted() {},
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="less" scoped>
.video-js{
    width: 100%;
    min-height: 400px;
}
</style>