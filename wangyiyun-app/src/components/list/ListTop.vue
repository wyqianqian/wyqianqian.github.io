<template>
  <div class="itemMusicTop">
    <img :src="list.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>

  <div class="itemMusicContent">
    <div class="content-left">
      <img :src="list.coverImgUrl" alt="" />
    </div>
    <div class="content-right">
      <p class="name">{{ list.name }}</p>
      <div class="creator">
        <img :src="list.creator.avatarUrl" alt="" v-if="list.creator" />
        <span v-if="list.creator">{{ list.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="description">
        <span>{{ list.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>

  <div class="itemMusicFooter">
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ list.commentCount }}</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ list.shareCount }}</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(list) {
    console.log(list);
  },
  props: ["list"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  position: relative;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;

    span {
      font-size: 0.4rem;
      color: #fff;
    }

    .icon {
      fill: #fff;
    }
  }

  .bgimg {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 11rem;
    // filter 属性定义了元素(通常是<img>)的可视效果(例如：模糊与饱和度)。
    filter: blur(30px);
  }
}

.itemMusicContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  margin-top: 0.1rem;
  height: 2.6rem;

  .content-left {
    width: 35%;

    img {
      width: 100%;
      border-radius: 0.2rem;
    }
  }

  .content-right {
    color: #fff;
    width: 62%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2.6rem;

    .name {
      color: #fff;
      font-size: 0.3rem;
      font-weight: 800;
    }

    .creator {
      color: rgb(228, 225, 225);
      font-size: 0.24rem;

      img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 0.1rem;
      }
    }

    .description {
      color: rgb(228, 225, 225);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.2rem;

      span {
        width: 95%;
        overflow: hidden;
        // text-overflow 属性规定当文本溢出包含元素时发生的事情。
        // ellipsis	显示省略符号来代表被修剪的文本。
        text-overflow: ellipsis;
        display: -webkit-box;
        /**  
            可以把 块容器 中的内容限制为指定的行数。
            它只有在 display 属性设置成 -webkit-box 或者 -webkit-inline-box 
            并且 -webkit-box-orient (en-US) 属性设置成 vertical时才有效果
        */
        -webkit-line-clamp: 2;
        // box-orient 属性指定一个box子元素是否应按水平或垂直排列。
        -webkit-box-orient: vertical;
      }
    }

    .icon {
      width: 0.22rem;
      height: 0.22rem;
    }
  }
}

.itemMusicFooter {
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-around;
  height: 0.9rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    span {
      color: #fff;
      font-size: .2rem;
    }

    .icon {
      fill: #fff;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>
