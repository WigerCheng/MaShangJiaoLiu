<template>
  <el-container>
    <el-header>
      <MainHeader />
    </el-header>
  </el-container>
  <el-main>
    <el-row>
      <el-col :span="15">
        <div class="detail_container">
          <div class="detail_topic_">
            <div class="detail_title_box">
              <h1>{{ item.title }}</h1>
              <div>
                <span>{{ item.user.username }}</span> ·
                <span>{{ item.publishTime }}</span>
              </div>
            </div>
            <div class="detail_content_box">
              <p>{{ item.content }}</p>
            </div>
          </div>
          <div class="comment_list_box">
            <CommentList :topicId="item.topicId" />
          </div>
          <div class="comment_input_box">
            <div class="comment_tips">
              <p>添加一条新回复</p>
            </div>
            <div class="comment_input">
              <el-input v-model="comment" type="textarea" :rows="4"></el-input>
            </div>
          </div>
          <div class="comment_send">
            <el-button type="primary" @click="onComment">回复</el-button>
            <p class="flex-right-align">请尽量让自己的回复能够对别人有帮助</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import CommentList from "@/components/CommentList.vue";
import AXIOS from "../request/request";
export default {
  components: { MainHeader, CommentList },
  data() {
    return {
      comment: "",
      item: {
        user: {},
      },
    };
  },
  methods: {
    async getTopic() {
      await AXIOS.get(`/topics/20`).then((res) => {
        const response = res.data;
        if (response.code === 200) {
          this.item = response.data;
        } else {
          console.log("出错");
        }
      });
    },

    onComment() {
      if (this.comment === null || this.comment === "") {
        alert("不能为空");
        return;
      }
      this.onCommentSubmit(this.comment);
    },

    async onCommentSubmit(text) {
      await AXIOS.post("/comments", {
        ownTopicId: 20,
        commentContent: text,
      }).then((res) => {
        const response = res.data;
        if (response.code === 200) {
          console.log(response.data);
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    this.getTopic();
  },
};
</script>

<style scoped>
.detail_container {
  background-color: greenyellow;
  padding: 16px;
  text-align: left;
}

.detail_title_box {
  border-bottom: 1px solid #e2e2e2;
}

.detail_title_box * {
  margin-top: 4px;
  margin-bottom: 4px;
}

.detail_content_box p {
  word-wrap: break-word;
}

.comment_tips {
  background-color: pink;
  border: 1px solid #e2e2e2;
  padding: 8px;
}

.comment_input {
  padding: 4px;
}

.comment_send {
  padding: 4px;
  display: flex;
  justify-items: center;
}
</style>