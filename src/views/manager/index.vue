<template>
  <el-container class="container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>电商后台管理系统</span>
      </div>
      <!-- 登录退出按钮 -->
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>

    <!-- 内容区域 -->
    <el-container>
      <!-- 边栏区域 -->
      <el-aside width="200px">
        <div class="uesr-avatar" v-show="!isCollapse">
          <img src="../../assets/avatar.jpg" alt="用户头像" />
          <span>用户</span>
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#263238"
          text-color="#fff"
          active-text-color="#3691ff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="1">处理中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$confirm("确认登出？").then(() => {
        this.$store.commit("logout");
        this.$router.push("/");
      });
    },
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
}

.el-header {
  background-color: #3691ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header span {
  font-size: 20px;
  color: white;
  display: inline-block;
  width: 200px;
}

.el-aside {
  background-color: #263238;
}

.el-aside .uesr-avatar {
  margin-top: 10px;
  color: #848a8e;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100px;
}

.el-aside .uesr-avatar img {
  border-radius: 50%;
  border: 3px solid #eee;
  overflow: hidden;
  height: 60px;
  width: 60px;
}

.el-aside .el-menu {
  border-right: none;
}
</style>