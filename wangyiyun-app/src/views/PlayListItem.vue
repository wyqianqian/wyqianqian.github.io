<template>
  <div>
    <ListTop :list="state.list" />
    <ListContent :songs="state.songs" :subscribedCount="state.list.subscribedCount"/>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getPlayList, getListAllMusic } from "@/request/api/list";
import ListTop from "@/components/list/ListTop.vue";
import ListContent from "@/components/list/ListContent.vue";

export default {
  setup() {
    const state = reactive({
      list: [],
      songs: []
    });

    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getPlayList(id);
      state.list = res.data.playlist;

      let result = await getListAllMusic(id,20,0);
      console.log(result);
      state.songs = result.data.songs;
    });

    return { state };
  },
  components: {
    ListTop,
    ListContent,
  },
};
</script>

<style>
</style>