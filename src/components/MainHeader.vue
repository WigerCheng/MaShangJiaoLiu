<template>
  <header class="main-header">
    <el-row type="flex" align="middle" gutter="10">
      <el-col :span="1">
        <router-link to="">
          <img class="logo" src="..\assets\logo.png" alt="" />
        </router-link>
      </el-col>

      <el-col :span="20">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">发现</el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="3">
        <el-row>
          <el-col :span="12">
            <router-link to="register">
              <el-button type="text">注册</el-button>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link to="login">
              <el-button type="text">登录</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
    },
  },
};
</script>

<style>
.logo {
  width: 50px;
  height: 50px;
}
</style>