<template>
  <el-card>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="" prop="userId" width="50"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="性别">
        <template #default="scope">
          <span style="margin-left: 10px">{{
            scope.row.gender === 1 ? "男" : "女"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <span style="margin-left: 10px">{{
            scope.row.isAdmin ? "超级管理员" : "普通用户"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class="icon-conllinear" width="200">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </el-card>
  <el-dialog title="修改用户信息" v-model="isEditDialogVisible" width="50%">
    <el-form :model="editUserForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="editUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="editUserForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="editUserForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="editUserForm.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色">
        <el-radio-group v-model="editUserForm.isAdmin">
          <el-radio :label="true">超级管理员</el-radio>
          <el-radio :label="false">普通用户</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateUser">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import AXIOS from "../../request/request";
export default {
  data() {
    return {
      users: [],
      size: 10,
      page: 1,
      total: 0,
      isEditDialogVisible: false,
      editUserForm: {},
    };
  },
  methods: {
    async getUserList() {
      await AXIOS.get("/users", {
        params: {
          size: this.size,
          page: this.page,
        },
      }).then((response) => {
        let data = response.data;
        let code = data.code;
        if (code === 200) {
          this.users = data.data.list;
          this.total = data.data.total;
        }
      });
    },

    showEditDialog(user) {
      this.isEditDialogVisible = true;
      this.editUserForm = user;
    },

    changePage(pagenum) {
      this.page = pagenum;
      this.getUserList();
    },

    async onUpdateUser() {
      let uid = this.editUserForm.userId;
      delete this.editUserForm.userId;
      await AXIOS.put(`/users/${uid}`, this.editUserForm).then((response) => {
        let res = response.data;
        if (res.code === 200) {
          this.$message({
            message: "修改用户成功",
            type: "success",
          });
          this.isEditDialogVisible = false;
        }
      });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style>
</style>