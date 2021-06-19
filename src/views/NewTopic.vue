<template>
  <el-container direction="vertical">
    <MainHeader />
    <div class="main-content-container">
      <el-row>
        <el-col :span="16">
          <div class="new_topic_container">
            <el-form
              :model="newTopicForm"
              ref="newTopicForm"
              :rules="newTopicRules"
              status-icon
            >
              <div class="new_topic_title_box">
                <h3 class="left-text">主题标题</h3>
                <p class="flex-right-align count_text">
                  {{ titleCount }}
                </p>
              </div>
              <el-form-item prop="title">
                <el-input
                  v-model="newTopicForm.title"
                  placeholder="请输入主题标题，如果标题能够表达完整内容，则正文可以为空"
                  maxlength="120"
                  @input="updateTitleCount"
                ></el-input>
              </el-form-item>
              <div class="new_topic_content_box">
                <h3 class="left-text">正文</h3>
                <p class="flex-right-align count_text">
                  {{ contentCount }}
                </p>
              </div>
              <el-form-item prop="content">
                <el-input
                  v-model="newTopicForm.content"
                  type="textarea"
                  :rows="15"
                  maxlength="20000"
                  @input="updateContentCount"
                ></el-input>
              </el-form-item>
              <div class="new_topic_send_box">
                <el-form-item prop="tagId">
                  <el-select
                    v-model="newTopicForm.tagId"
                    placeholder="请选择文章主题"
                  >
                    <el-option
                      v-for="tag in tags"
                      :key="tag.tagId"
                      :label="tag.tagName"
                      :value="tag.tagId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div class="flex-right-align">
                  <el-button
                    type="primary"
                    icon="el-icon-s-promotion"
                    @click="onPostTopic('newTopicForm')"
                    >发送主题</el-button
                  >
                </div>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import AXIOS from "../request/request";

export default {
  data() {
    return {
      newTopicForm: {
        title: "",
        content: "",
        tagId: null,
      },
      newTopicRules: {
        title: [
          {
            required: true,
            message: "主题不能为空",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "正文不能为空",
            trigger: "blur",
          },
        ],
        tagId: [
          {
            required: true,
            message: "文章主题不能为空",
            trigger: "change",
          },
        ],
      },
      titleCount: 120,
      contentCount: 20000,
      tags: [],
    };
  },
  components: { MainHeader },
  methods: {
    updateTitleCount(text) {
      this.titleCount = 120 - text.length;
    },
    updateContentCount(text) {
      this.contentCount = 20000 - text.length;
    },
    onPostTopic(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onPostTopicSubmit(
            this.newTopicForm.title,
            this.newTopicForm.content,
            this.newTopicForm.tagId
          );
        } else {
          return false;
        }
      });
    },
    onPostTopicSubmit(title, content, tagId) {
      const data = {
        title: title,
        content: content,
        ownTagId: tagId,
        publishTime: new Date(),
      };
      console.log(data);
      AXIOS.post("/topics", data).then((i) => {
        console.log(i);
      });
    },
    getTagList() {
      AXIOS.get("/tags").then((res) => {
        const response = res.data;
        if (response.code === 200) {
          console.log(response.data);
          this.tags = response.data;
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    this.getTagList();
  },
};
</script>

<style scoped>
.new_topic_container {
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 4px;
}

.new_topic_title_box,
.new_topic_content_box,
.new_topic_send_box {
  display: flex;
  align-items: center;
  padding: 8px;
}

.count_text {
  color: #9e9e9e;
}
</style>