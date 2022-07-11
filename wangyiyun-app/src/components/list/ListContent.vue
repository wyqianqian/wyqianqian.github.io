<template>
  <div class="songs-main">
    <div class="songs-top">
      <div class="songs-top-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span class="moreBlack">播放全部</span>
        <span class="songsCount">(共{{ songs.length }}首)</span>
      </div>
      <div class="songs-top-right">
        <p>+ 收藏({{ subscribedCount }})</p>
      </div>
    </div>
    <div class="songs-content">
      <div
        class="songs-content-item"
        v-for="(item, index) in songs"
        :key="item.id"
      >
        <div class="songs-content-item-left" @click="playMusic(index)">
          <div class="rank">{{ index + 1 }}</div>
          <div class="info">
            <p class="name moreBlack">{{ item.name }}</p>
            <p class="author">
              <span v-for="author in item.ar" :key="author.id">{{
                author.name
              }}</span>
            </p>
          </div>
        </div>
        <div class="songs-content-item-right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  setup() {},
  props: ["songs", "subscribedCount"],
  methods: {
    playMusic(index) {
      this.updatePlayList(this.songs);
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang="less" scoped>
.songs-main {
  margin-top: 0.34rem;
  padding: 0.1rem 0.2rem 0 0.2rem;
  background: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  margin-bottom: 1.4rem;

  .songs-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.2rem;

    .songs-top-left {
      .icon {
        fill: black;
        vertical-align: middle;
        margin-right: 0.18rem;
        margin-top: -0.1rem;
      }

      .songsCount {
        color: rgb(143, 142, 142);
        font-size: 0.28rem;
      }
    }

    .songs-top-right {
      padding: 0 0.1rem;
      background-color: red;
      width: 2.3rem;
      height: 0.8rem;
      border-radius: 0.35rem;

      p {
        line-height: 0.8rem;
        color: white;
      }
    }
  }

  .songs-content {
    // border: 1px solid red;

    .songs-content-item {
      margin: 0.2rem 0.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .songs-content-item-left {
        width: 78%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .rank {
          color: rgb(143, 142, 142);
          width: 10%;
        }

        .info {
          line-height: 25px;

          .author {
            font-size: 0.2rem;
            color: rgb(143, 142, 142);
          }
        }
      }

      .songs-content-item-right {
        width: 18%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row-reverse;

        .icon {
          fill: rgb(143, 142, 142);
        }
      }
    }

    .songs-content-item:last-child {
      padding-bottom: 1.4rem;
    }
  }

  .moreBlack {
    font-weight: 700;
  }
}
</style>

