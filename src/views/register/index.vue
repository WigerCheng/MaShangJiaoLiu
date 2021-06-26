<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        status-icon
        label-width="120px"
        label-position="left"
      >
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="againPassword" label="再次输入密码">
          <el-input
            v-model="registerForm.againPassword"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="registerForm.phone"> </el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio-group v-model="registerForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary" @click="onRegister('registerForm')"
          >注册</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import AXIOS from "../../request/request";
export default {
  name: "register",
  data() {
    var validateAgainPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        againPassword: "",
        phone: "",
        gender: 1,
      },
      registerRules: {
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
        againPassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
          { validator: validateAgainPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onRegisterSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async onRegisterSubmit() {
      await AXIOS.post("/users", this.registerForm).then((response) => {
        let data = response.data;
        let code = data.code;
        switch (code) {
          case 201:
            this.$message({
              message: "注册失败，账户已存在",
              type: "warning",
            });
            break;
          case 200: {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.$router.push("/login");
            break;
          }
          default:
            this.$message({
              message: data.message,
              type: "warning",
            });
            break;
        }
        console.log(code);
      });
    },
  },
};
</script>

<style>
.register_container {
  background: url('../../assets/register_bg.jpg');
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}

.register_box {
  width: 600px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 10px #a9a9a9;
  padding: 16px;
}
</style>