<template>
  <header class="main_header_container">
    <el-row type="flex" align="middle">
      <el-col :span="1">
        <router-link to="/">
          <div class="logo" />
        </router-link>
      </el-col>
      <el-col :span="20"> </el-col>
      <el-col :span="3">
        <div class="login_top_container" v-if="!isLogin">
          <router-link to="/">
            <el-button type="text">首页</el-button>
          </router-link>
          <router-link to="register">
            <el-button type="text">注册</el-button>
          </router-link>
          <router-link to="/login">
            <el-button type="text">登录</el-button>
          </router-link>
        </div>
        <div class="login_top_container" v-if="isLogin">
          <router-link to="/">
            <el-button type="text">首页</el-button>
          </router-link>
          <el-button type="text" @click="logOut">登出</el-button>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$confirm("确认登出？").then(() => {
        this.$store.commit("logout");
        this.$router.push("/");
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isUserLogin;
    },
  },
};
</script>

<style scoped>
.main_header_container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}

.main_header_container .el-row {
  min-width: 600px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  width: 50px;
  height: 50px;
  background: url("../assets/logo.png") no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
}

.login_top_container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}

.login_top_container .el-button {
  margin-left: 4px;
  margin-right: 4px;
}
</style>