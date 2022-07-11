<template>
  <div class="search-top">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      ref="input"
      type="text"
      placeholder="陈奕迅"
      @keydown.enter="startSearch"
      v-model="searchKey"
    />
  </div>
  <div class="search-history">
    <span class="history">历史</span>
    <span
      @click="searchWithHistory(item)"
      v-for="(item, index) in keyWordList"
      :key="index"
      class="span-key"
      >{{ item }}</span
    >
    <svg class="icon" aria-hidden="true" @click="deleteHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="songs-content">
    <div
      class="songs-content-item"
      v-for="(item, index) in searchList"
      :key="item.id"
    >
      <div class="songs-content-item-left" @click="playMusic(item)">
        <div class="rank">{{ index + 1 }}</div>
        <div class="info">
          <p class="name moreBlack">{{ item.name }}</p>
          <p class="author">
            <span v-for="author in item.artists" :key="author.id">{{
              author.name
            }}</span>
          </p>
        </div>
      </div>
      <div class="songs-content-item-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from "@/request/api/home";

export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
  },
  methods: {
    async startSearch() {
      if (this.searchKey === "") return;
      this.keyWordList.unshift(this.searchKey);
      //去重
      this.keyWordList = [...new Set(this.keyWordList)];

      //限制长度
      if (this.keyWordList.length > 5) {
        this.keyWordList.pop();
      }

      let res = await getSearchResult(this.searchKey);
      console.log(res);
      this.searchList = res.data.result.songs;

      localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
      this.searchKey = "";
    },
    deleteHistory() {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    async searchWithHistory(value) {
      this.searchKey = value;
      let res = await getSearchResult(this.searchKey);
      console.log(res);
      this.searchList = res.data.result.songs;
    },
    playMusic(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      item.ar = item.artists;
      this.$store.commit("pushMusic", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.search-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.2rem;
  height: 1rem;

  input {
    width: 90%;
    outline: none;
    border: none;
    border-bottom: 1px solid #b0b0b0;
    padding-bottom: 0.1rem;
  }
}

.search-history {
  position: relative;
  padding: 0.2rem;

  .history {
    font-size: 16px;
    font-weight: 800;
  }

  .span-key {
    background-color: #e1d6d6;
    border-radius: 0.4rem;
    padding: 0.1rem 0.2rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }

  .icon {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 0.2rem;
    vertical-align: middle;
  }
}

.songs-content {
  .songs-content-item {
    margin: 0.2rem 0.3rem;

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
</style>