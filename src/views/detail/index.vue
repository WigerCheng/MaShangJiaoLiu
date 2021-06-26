<template>
  <el-container direction="vertical">
    <MainHeader />
    <div class="main-content-container">
      <el-row>
        <el-col :span="24">
          <div class="detail_container" v-if="isLoadTopic">
            <el-card>
              <div class="detail_topic_container">
                <div class="detail_title_box">
                  <h1>{{ item.title }}</h1>
                  <div style="margin-top: 10px">
                    <span>{{ item.user.username }}</span> ·
                    <span>{{ format(item.publishTime) }}</span>
                  </div>
                </div>
                <div class="detail_content_box" v-html="compiledMarkdown"></div>
              </div>
            </el-card>

            <el-card style="margin-top: 20px">
              <div class="comment_list_box" v-if="comments.length !== 0">
                <CommentList :commentList="comments" v-if="isLoadComments" />
                <el-pagination
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="size"
                  @current-change="changePage"
                  :hide-on-single-page="true"
                >
                </el-pagination>
              </div>
              <p v-if="comments.length === 0">还没有回复，快来回复吧！</p>
            </el-card>

            <el-card style="margin-top: 20px">
              <div class="comment_input_box">
                <div class="comment_tips">
                  <p>添加一条新回复</p>
                </div>
                <div class="comment_input">
                  <el-input
                    v-model="comment"
                    type="textarea"
                    :rows="4"
                  ></el-input>
                </div>
              </div>
              <div class="comment_send">
                <el-button type="primary" @click="onComment">回复</el-button>
                <p class="flex-right-align">
                  请尽量让自己的回复能够对别人有帮助
                </p>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import CommentList from "@/components/CommentList.vue";
import AXIOS from "../../request/request";
import marked from "marked";
import formatTime from "../../time";
export default {
  components: { MainHeader, CommentList },
  data() {
    return {
      comment: "",
      topicId: this.$route.params.topicId,
      comments: [],
      isLoadComments: false,
      isLoadTopic: false,
      size: 10,
      page: 1,
      total: 0,
    };
  },
  methods: {
    format(time) {
      return formatTime(time);
    },
    changePage(pageNum) {
      this.page = pageNum;
      this.isLoadComments = false;
      this.getCommentList();
    },

    onComment() {
      if (this.comment === null || this.comment === "") {
        this.$message({
          type: "error",
          message: "评论不能为空",
        });
        return;
      }
      this.isLoadComments = false;
      this.onCommentSubmit(this.comment);
    },

    async getTopic() {
      await AXIOS.get(`/topics/${this.topicId}`).then((res) => {
        const response = res.data;
        if (response.code === 200) {
          this.item = response.data;
          this.isLoadTopic = true;
        } else {
          console.log("出错");
        }
      });
    },

    async getCommentList() {
      await AXIOS.get(`/comments/${this.topicId}`, {
        params: {
          size: this.size,
          page: this.page,
        },
      }).then((response) => {
        let data = response.data;
        let code = data.code;
        if (code === 200) {
          this.comments = data.data.list;
          this.total = data.data.total;
          this.isLoadComments = true;
        } else {
          console.log("出错");
        }
      });
    },

    async onCommentSubmit(text) {
      await AXIOS.post("/comments", {
        ownTopicId: this.topicId,
        commentContent: text,
      }).then((res) => {
        const response = res.data;
        if (response.code === 200) {
          this.$message({
            type: "success",
            message: "评论成功",
          });
          this.comment = "";
          this.getCommentList();
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    this.getTopic();
    this.getCommentList();
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.item.content, { sanitize: true });
    },
  },
};
</script>

<style scoped>
.detail_title_box {
  border-bottom: 1px solid #e2e2e2;
}

.detail_title_box * {
  margin-top: 4px;
  margin-bottom: 4px;
}

.detail_content_box {
  word-wrap: break-word;
  margin-top: 10px;
}

.comment_input_box {
  padding: 4px;
}

.comment_send {
  padding: 4px;
  display: flex;
  justify-items: center;
}
</style>