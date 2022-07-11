<template>
  <div class="login-main">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <h1>欢迎登录</h1>

    <div class="login-info">
      <input type="text" placeholder="请输入手机号码" v-model="phone" />
      <input type="password" placeholder="请输入密码" v-model="password" @keydown.enter="login"/>
      <input type="button" value="登录" @click="login" />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getUserDetail } from "@/request/api/home";

export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("login", {
        phone: this.phone,
        password: this.password,
      });

      if (res.data.code === 200) {
        this.$store.commit("updateLoginStatus");
        this.$store.commit("updateToken", res.data.token);

        let result = await getUserDetail(res.data.account.id);
        this.$store.commit("updateUserDetail", result.data);

        this.$router.push("/userinfo");
      } else {
        Toast(res.data.message);
      }
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.login-main {
  text-align: center;
  padding: 1rem;

  h1 {
    margin-bottom: 2rem;
  }

  .login-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      height: 0.65rem;
      width: 5rem;
      margin-bottom: 0.3rem;
      outline: none;
      border: 1px solid #999;
      border-radius: 0.05rem;
    }

    input[type="button"] {
      width: 2rem;
    }
  }
}

.icon {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
}
</style>