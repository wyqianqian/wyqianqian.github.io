<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="recommendList">
      <van-swipe
        :loop="false"
        :width="120"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item.id">
          <router-link :to="{ path: '/playlist', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <p class="name">{{ item.name }}</p>
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play-copy"></use>
              </svg>
              {{ getPlayCountText(item.playCount) }}
            </span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getRecommendMusicList } from "@/request/api/home";
import { onMounted, reactive } from "vue";

export default {
  //vue2
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   async getRecommendList() {
  //     let res = await getRecommendMusicList();
  //     this.musicList = res.data.result;
  //   },
  //   getPlayCountText(sum) {
  //     if (sum > 100000000) {
  //       return (sum / 100000000).toFixed(1) + "亿";
  //     } else if (sum > 10000) {
  //       return (sum / 10000).toFixed(1) + "万";
  //     } else {
  //       return sum;
  //     }
  //   },
  // },
  // mounted() {
  //   this.getRecommendList();
  // },

  //vue3
  setup() {
    const state = reactive({
      musicList: [],
    });
    function getPlayCountText(sum) {
      if (sum > 100000000) {
        return (sum / 100000000).toFixed(1) + "亿";
      } else if (sum > 10000) {
        return (sum / 10000).toFixed(1) + "万";
      } else {
        return sum;
      }
    }
    onMounted(async () => {
      let res = await getRecommendMusicList();
      state.musicList = res.data.result;
    });
    return { state, getPlayCountText };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  // border: 1px solid red;

  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .title {
      font-weight: 900;
      font-size: 0.4rem;
    }

    .more {
      line-height: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      color: #333;
      padding: 0 0.2rem;
    }
  }

  .recommendList {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      position: relative;
      padding-right: 0.2rem;

      img {
        width: 100%;
        border-radius: 0.2rem;
      }

      .name {
        color: #333;
        font-size: 0.24rem;
      }

      .playCount {
        color: white;
        position: absolute;
        top: 0.08rem;
        right: 0.3rem;
        font-size: 0.24rem;

        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
}
</style>
