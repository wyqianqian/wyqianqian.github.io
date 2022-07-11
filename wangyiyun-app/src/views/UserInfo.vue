<template>
  <div>
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <img :src="info.profile.backgroundUrl" alt="" class="bg-img" />

    <div class="person">
      <img :src="info.profile.avatarUrl" alt="" class="avatar-img" />
      <div class="name">
        <p>
          <span class="nickname">{{ info.profile.nickname }}</span>
          <span class="level">Lv.{{ info.level }}</span>
        </p>
        <p class="follow">
          关注({{ info.profile.follows }})&nbsp;&nbsp;&nbsp; 粉丝({{
            info.profile.followeds
          }})
        </p>
        <p class="description">个人介绍：{{ info.profile.signature }}</p>
      </div>
    </div>

    <div class="songs">
      <p class="listen">累计听歌：{{ info.listenSongs }}首</p>
      <p>我创建的歌单({{ info.profile.playlistCount }})</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return (
        this.$store.state.userDetail ||
        JSON.parse(localStorage.getItem("userdetail"))
      );
    },
  },
};
</script>

<style lang="less" scoped>
.bg-img {
  width: 100%;
  height: 7rem;
  margin-bottom: 0.3rem;
}

.person {
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.2rem;

  .avatar-img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }

  .name {
    height: 2.2rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .nickname {
      font-size: 0.4rem;
      font-weight: 600;
    }

    .level {
      font-weight: 600;
      color: red;
      border: 1px solid rgb(212, 48, 48);
      border-radius: 0.3rem;
      padding: 0.05rem 0.15rem;
      margin-left: 0.1rem;
    }

    .description {
      color: rgb(138, 135, 135);
    }

    .follow {
      padding-top: 0.1rem;
      border-top: 1px solid #eee;
      color: rgb(138, 135, 135);
    }
  }
}

.songs {
  padding: 0.2rem;
  color: rgb(138, 135, 135);
  line-height: 2;
}

.icon {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  fill: #fff;
}
</style>