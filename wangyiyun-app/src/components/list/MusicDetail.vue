<template>
  <div>
    <img class="detail-bgimg" :src="info.al.picUrl" alt="" />
    <div class="detail-top">
      <div class="detail-top-left">
        <svg class="icon" aria-hidden="true" @click="updateShowDetail">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="detail-leftMarque">
          <Vue3Marquee style="color: #fff;margin-bottom:5px">
            {{ info.name }}
          </Vue3Marquee>

          <span v-for="item in info.ar" :key="item.id">{{ item.name }}&nbsp;</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <div class="detail-top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detail-content" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="needle-common"
        :class="isPlay ? 'needle-active' : 'needle-no-active'"
      />
      <img src="@/assets/cd.png" alt="" class="cd" />
      <img
        :src="info.al.picUrl"
        alt=""
        class="middle-img"
        :class="isPlay ? 'middle-img-active' : 'middle-img-pause'"
        @click="isLyricShow = true"
      />
    </div>
    <div class="lyric" ref="lyric" v-show="isLyricShow">
      <p
        v-for="item in lyricArray"
        :key="item"
        :class="
          item.time <= currentTime && item.nextTime >= currentTime
            ? 'current-lyric'
            : ''
        "
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detail-footer">
      <div class="footer-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footer-content">
        <input
          type="range"
          name=""
          id=""
          class="progress"
          min="0"
          :max="audio.duration"
          step="0.05"
          v-model="currentTime"
        />
      </div>
      <div class="footer-foot">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bigIcon"
          aria-hidden="true"
          v-show="!isPlay"
          @click="play"
        >
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg
          class="icon bigIcon"
          aria-hidden="true"
          v-show="isPlay"
          @click="play"
        >
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          >
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  props: ["info", "playFun", "audio"],
  components: {
    Vue3Marquee,
  },
  computed: {
    ...mapState([
      "isPlay",
      "lyric",
      "currentTime",
      "playListIndex",
      "playList",
    ]),
    lyricArray() {
      var array;
      if (this.lyric) {
        console.log(this.lyric);
        array = this.lyric
          .split(/[(\r\n)\r\n]+/)
          .filter((item) => {
            return item !== "";
          })
          .map((item, i) => {
            let timeStr = item.split("]")[0].split("[")[1];
            let min = parseInt(String(timeStr).split(":")[0]);
            let sec = parseInt(
              String(String(timeStr).split(":")[1]).split(".")[0]
            );
            let mill = parseFloat(
              String(String(timeStr).split(":")[1]).split(".")[1]
            );

            let time = parseFloat(min * 60 + sec + mill / 1000);

            let lrc = item.split("]")[1];
            return { min, sec, mill, lrc, time };
          });

        array.forEach((item, i) => {
          if (i === array.length - 1 || isNaN(array[i + 1].time)) {
            item.nextTime = 9999999;
          } else {
            item.nextTime = array[i + 1].time;
          }
        });
      }
      console.log(array);
      return array;
    },
  },
  methods: {
    updateShowDetail() {
      this.updateDetailShow();
      this.isLyricShow = false;
    },
    play() {
      this.playFun();
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index >= this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    currentTime() {
      // console.log('isEnd:' + this.audio.ended + ' current:' + this.currentTime + ' duration:' + this.audio.duration);
      if (this.audio.ended) {
        this.goPlay(1);
      }

      if (!this.isLyricShow) {
        return;
      }
      var p = document.querySelector("p.current-lyric");
      // 加[]可以查看DOM元素的所有信息
      // console.log([p]);
      if (p && p.offsetTop > 200) {
        this.$refs.lyric.scrollTop = p.offsetTop - 200;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail-bgimg {
  width: 100%;
  height: 100%;
  filter: blur(30px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.detail-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  padding: 0.2rem;
  fill: white;

  .detail-top-left {
    display: flex;
    align-items: center;

    .detail-leftMarque {
      width: 3.5rem;
      height: 100%;
      color: black;
      margin-left: 0.4rem;

      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }

      span {
        color: #999;
      }
    }
  }
}

.detail-content {
  position: relative;
  display: flex;
  align-items: center;
  height: 9rem;
  flex-direction: column;
  margin-top: 0.4rem;

  .needle-common {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
  }

  .needle-no-active {
    transform: rotate(-15deg);
    transition: all 2s;
  }

  .needle-active {
    transform: rotate(0);
    transition: all 2s;
  }

  .cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .middle-img {
    width: 3.2rem;
    height: 3.2rem;
    position: absolute;
    bottom: 3.14rem;
    border-radius: 50%;
    animation: rotate-middle-img 10s linear infinite;
  }

  .middle-img-active {
    animation-play-state: running;
  }

  .middle-img-pause {
    animation-play-state: paused;
  }

  @keyframes rotate-middle-img {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.lyric {
  height: 8rem;
  overflow: scroll;
  line-height: 3;
  color: rgb(196, 192, 192);
  padding: 0.2rem 0.2rem 0 0.2rem;
  text-align: center;

  .current-lyric {
    color: white;
    font-size: 0.5rem;
    font-weight: 500;
  }
}

.detail-footer {
  width: 100%;
  height: 3.2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  fill: white;

  .footer-top {
    display: flex;
    justify-content: space-around;
  }

  .footer-content {
    margin: 0.4rem 0;

    .progress {
      width: 100%;
      height: 0.06rem;
    }
  }

  .footer-foot {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .bigIcon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
