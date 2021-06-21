<template>
  <el-card>
    <el-table :data="topics" style="width: 100%">
      <el-table-column prop="topicId" width="50" label=""></el-table-column>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="作者" prop="user.username"></el-table-column>
      <el-table-column label="发布时间" prop="publishTime"></el-table-column>
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
          <el-button
            type="success"
            icon="el-icon-s-comment"
            size="mini"
            @click="onHandleComment(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changeTopicPage"
    >
    </el-pagination>
  </el-card>
  <el-dialog
    title="编辑文章"
    v-model="isTopicDialogVisible"
    @close="clearTopicDialog"
  >
    <ChangeTopic
      :topic="changeTopic"
      v-if="isTopicDialogVisible"
      @postTopic="onPostTopicSubmit"
    />
  </el-dialog>
  <el-dialog
    title="评论管理"
    fullscreen
    v-model="isCommentDialogVisible"
    @close="clearCommentDialog"
  >
    <el-table :data="comments">
      <el-table-column
        label="评论人"
        prop="user.username"
        width="100"
      ></el-table-column>
      <el-table-column
        label="评论时间"
        prop="commentTime"
        width="200"
      ></el-table-column>
      <el-table-column label="评论内容" prop="commentContent"></el-table-column>
      <el-table-column label="操作" class="icon-conllinear" width="50">
        <template #default="scope">
          <el-button
            type="warning"
            icon="el-icon-delete"
            size="mini"
            @click="onDeleteComment(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="commentTotal"
      :page-size="commentSize"
      @current-change="changeCommentPage"
    >
    </el-pagination>
  </el-dialog>
</template>

<script>
import AXIOS from "../../request/request";
import ChangeTopic from "@/components/ChangeTopic.vue";
export default {
  components: { ChangeTopic },
  data() {
    return {
      topics: [],
      comments: [],
      size: 10,
      page: 1,
      total: 0,
      commentSize: 10,
      commentPage: 1,
      commentTotal: 0,
      isTopicDialogVisible: false,
      isCommentDialogVisible: false,
      changeTopic: null,
    };
  },
  methods: {
    onEditTopic(topic) {
      this.changeTopic = topic;
      this.isTopicDialogVisible = true;
    },
    onHandleComment(topic) {
      this.changeTopic = topic;
      this.getCommentList(topic.topicId);
      this.isCommentDialogVisible = true;
    },
    clearTopicDialog() {
      this.changeTopic = null;
      this.isTopicDialogVisible = false;
    },
    clearCommentDialog() {
      this.changeTopic = null;
      this.isCommentDialogVisible = false;
    },
    onDeleteTopic(topic) {
      this.$confirm(`是否删除${topic.title}这篇文章？`).then(() => {
        this.onDeleteTopicSubmit(topic.topicId);
      });
    },
    onDeleteComment(comment) {
      this.$confirm(`是否删除这条评论？`).then(() => {
        this.onDeleteCommentSubmit(comment.commentId);
      });
    },
    changeTopicPage(pagenum) {
      this.page = pagenum;
      this.getTopicList();
    },
    changeCommentPage(pagenum) {
      this.commentPage = pagenum;
      this.getCommentList(this.changeTopic.topicId);
    },
    async onPostTopicSubmit(topic) {
      let topicId = topic.topicId;
      delete topic.topicId;
      await AXIOS.put(`/topics/${topicId}`, topic).then((response) => {
        let res = response.data;
        if (res.code === 200) {
          this.$message({
            message: "修改文章成功",
            type: "success",
          });
          this.isTopicDialogVisible = false;
          this.getTopicList();
        }
      });
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

    async getCommentList(topicId) {
      await AXIOS.get(`/commentsss/${topicId}`, {
        params: {
          size: this.commentSize,
          page: this.commentPage,
        },
      }).then((response) => {
        let data = response.data;
        let code = data.code;
        if (code === 200) {
          this.comments = data.data.list;
          this.commentTotal = data.data.total;
        } else {
          console.log("出错");
        }
      });
    },

    async onDeleteCommentSubmit(id) {
      await AXIOS.delete(`/comments/${id}`).then((response) => {
        let data = response.data;
        let code = data.code;
        if (code === 200) {
          this.$message({
            type: "success",
            message: "评论删除成功",
          });
          this.getCommentList(this.changeTopic.topicId);
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