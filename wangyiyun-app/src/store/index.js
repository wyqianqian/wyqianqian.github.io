import { createStore } from 'vuex'
import { getLyric } from '@/request/api/list'
import { getPhoneLogin } from '@/request/api/home';

export default createStore({
  state: {
    playList: [{
      name: '大哥',
      al: {
        id: 512139,
        name: "叱吒新一代",
        pic: 76965813961922,
        picUrl: "https://p1.music.126.net/i2P1ox4pWG9VLeoRFeUxfQ==/76965813961922.jpg"
      },
      ar: [
        {
          id: 9605,
          name: "卫兰"
        }
      ],
      id: 5256469,
    }],
    playListIndex: 0,
    isPlay: false,
    isDetailShow: false,
    lyric: '',
    currentTime: 0,
    isLogin: false,
    token: '',
    userDetail: null
  },
  getters: {
  },
  mutations: {
    updatePlayState(state) {
      state.isPlay = !state.isPlay;
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.isDetailShow = !state.isDetailShow;
    },
    updateLyricList(state, value) {
      state.lyric = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    pushMusic(state, value) {
      state.playList.push(value);
    },
    updateLoginStatus(state) {
      state.isLogin = true;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem('token', state.token);
    },
    updateUserDetail(state, value) {
      console.log('userdetai:' + value);
      state.userDetail = value;
      localStorage.setItem('userdetail', JSON.stringify(value));
    }
  },
  actions: {
    async getMusicLyric(context, value) {
      let res = await getLyric(value);
      context.commit('updateLyricList', res.data.lrc.lyric);
    },
    async login(context, value) {
      return await getPhoneLogin(value);
    }
  },
  modules: {
  }
})
