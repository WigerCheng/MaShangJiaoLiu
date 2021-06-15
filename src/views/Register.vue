<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="againPassword">
          <el-input
            v-model="registerForm.againPassword"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="gender">
          <div class="form-item">
            <span class="form-title">性别</span>
            <!-- <div class="form-content"> -->
              <el-radio-group v-model="registerForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            <!-- </div> -->
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRegister('registerForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
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
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.form-item {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.form-title {
  display: inline;
  justify-self: start;
  padding: 8px;
  padding-right: 16px;
}

.register_container {
  background: #2b4b6b;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}

.register_box {
  width: 480px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 10px #a9a9a9;
  padding: 16px;
}
</style>