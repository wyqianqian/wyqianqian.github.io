<template>
  <div class="footer-music">
    <div class="footer-music-left" @click="showDetail">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <span v-for="item in playList[playListIndex].ar" :key="item">
          {{ item.name }}&nbsp;
        </span>
        <p class="footer-music-tips">横滑可以切换上下首哦</p>
      </div>
    </div>
    <div class="footer-music-right">
      <svg class="icon" aria-hidden="true" v-show="!isPlay" @click="play">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-show="isPlay" @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>

  <audio
    ref="audio"
    @timeupdate="timeUpdate"
    :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
  ></audio>

  <van-popup
    :show="isDetailShow"
    position="right"
    :style="{ height: '100%', width: '100%' }"
  >
    <MusicDetail :info="playList[playListIndex]" :playFun="play" :audio="$refs.audio"/>
  </van-popup>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import MusicDetail from "./MusicDetail.vue";

export default {
  components: { MusicDetail },
  computed: {
    ...mapState(["playList", "playListIndex", "isPlay", "isDetailShow"]),
  },
  methods: {
    play() {
      // console.log([this.$refs.audio]);
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
      this.updatePlayState();
    },
    showDetail() {
      this.updateDetailShow();
    },
    timeUpdate() {
      this.updateCurrentTime(this.$refs.audio.currentTime);
    },
    ...mapMutations([
      "updatePlayState",
      "updateDetailShow",
      "updateCurrentTime",
    ]),
    ...mapActions(["getMusicLyric"]),
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (!this.isPlay) {
        this.updatePlayState();
      }
    },
    playList() {
      this.$refs.audio.autoplay = true;
      this.updatePlayState();
    },
  },
  updated() {
    this.getMusicLyric(this.playList[this.playListIndex].id);
  },
};
</script>

<style lang="less" scoped>
.footer-music {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;

  .footer-music-left {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 1.5;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }

    .footer-music-tips {
      font-size: 0.16rem;
      color: #999;
    }
  }

  .footer-music-right {
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>