<template>
  <el-card>
    <el-table :data="topics" style="width: 100%">
      <el-table-column prop="topicId" width="50" label=""></el-table-column>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="作者" prop="user.username"></el-table-column>
      <el-table-column
        label="文章所属主题"
        prop="tag.tagName"
      ></el-table-column>
      <el-table-column label="操作" class="icon-conllinear" width="200">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="onEditTopic(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-delete"
            size="mini"
            @click="onDeleteTopic(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import AXIOS from "../../request/request";
export default {
  data() {
    return {
      topics: [],
      size: 10,
      page: 1,
      total: 0,
    };
  },
  methods: {
    onEditTopic() {},
    onDeleteTopic(topic) {
      this.$confirm(`是否删除${topic.title}这篇文章？`).then(() => {
        this.onDeleteTopicSubmit(topic.topicId);
      });
    },
    changePage(pagenum) {
      this.page = pagenum;
      this.getUserList();
    },
    async onDeleteTopicSubmit(id) {
      await AXIOS.delete(`/topics/${id}`).then((response) => {
        let data = response.data;
        let code = data.code;
        if (code === 200) {
          this.$message({
            type: "success",
            message: "文章删除成功",
          });
          this.getTopicList();
        }
      });
    },
    async getTopicList() {
      await AXIOS.get("/topics", {
        params: {
          size: this.size,
          page: this.page,
        },
      }).then((response) => {
        let data = response.data;
        let code = data.code;
        if (code === 200) {
          this.topics = data.data.list;
          this.total = data.data.total;
        }
      });
    },
  },
  created() {
    this.getTopicList();
  },
};
</script>

<style>
</style>