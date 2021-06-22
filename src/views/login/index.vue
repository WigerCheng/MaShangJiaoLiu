<template>
  <div class="login_container">
    <div class="login_box">
      <el-form :model="loginForm" ref="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin('loginForm')"
            >登录</el-button
          >
        </el-form-item>
        <span>没有账户？点击</span>
        <router-link to="register">
          <el-button type="text">注册</el-button>
        </router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import AXIOS from "../../request/request";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onLoginSubmit(this.loginForm.username, this.loginForm.password);
        } else {
          return false;
        }
      });
    },

    onLoginSubmit(username, password) {
      AXIOS.post("/login", {
        username: username,
        password: password,
      }).then((response) => {
        let data = response.data;
        let code = data.code;
        switch (code) {
          case 201:
          case 202: {
            this.$message({
              type: "warning",
              message: data.message,
            });
            break;
          }
          case 200: {
            this.$message.success({
              message: "登录成功",
              type: "success",
            });
            this.$store.commit("login", data.data);
            let path = sessionStorage.getItem("toRouter");
            if (path) {
              this.$router.push(path);
            } else {
              this.$router.push("/");
            }
            break;
          }
          default: {
            this.$message.error("未知错误");
            break;
          }
        }
      });
    },
  },
};
</script>

<style>
.login_container {
  background: #2b4b6b;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}

.login_box {
  width: 480px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 10px #a9a9a9;
  padding: 16px;
}
</style>