<template>
  <div class="home">
    <TopNav />
    <SwipeTop />
    <IconList />
    <MusicList />
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/home/TopNav.vue";
import SwipeTop from "@/components/home/SwipeTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";

export default {
  name: "HomeView",
  components: {
    TopNav,
    SwipeTop,
    IconList,
    MusicList,
  },
};
</script>
