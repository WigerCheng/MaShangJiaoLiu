<template>
  <el-container class="container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>后台管理系统</span>
      </div>
      <!-- 登录退出按钮 -->
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>

    <!-- 内容区域 -->
    <el-container>
      <!-- 边栏区域 -->
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#263238"
          text-color="#fff"
          active-text-color="#3691ff"
          router
          :default-active="$route.path"
        >
          <el-menu-item index="/user">用户管理</el-menu-item>
          <el-menu-item index="/tag">主题管理</el-menu-item>
          <el-menu-item index="/topic">文章管理</el-menu-item>
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

.el-aside .el-menu {
  border-right: none;
}
</style>