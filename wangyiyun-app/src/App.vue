<template>
  <router-view />
  <!-- 必须套个div才能用v-show -->
  <div v-show="$route.name !== 'login' && $route.name !== 'userinfo'">
    <FooterMusic />
  </div>
</template>

<script>
import FooterMusic from "@/components/list/ListFooter.vue";

export default {
  components: { FooterMusic },
  // mounted(){
  //   console.log(this.$route);
  // }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

.icon {
  width: 0.5rem;
  height: 0.5rem;
}

a {
  color: #333;
}
</style>
