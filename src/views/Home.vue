<template>
  <el-container direction="vertical">
    <MainHeader />
    <div class="main-content-container">
      <el-row>
        <el-col :span="18">
          <div class="topic_list_container">
            <el-card>
              <TopicList :topicList="topics" v-if="isLoadTopics" />
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home_aside_container">
            <router-link to="new">
              <el-card>
                <div class="new_topic_container">
                  <img src="../assets/compose.png" width="28" />
                  <el-link>创建新主题</el-link>
                </div>
              </el-card>
            </router-link>
            <div class="tag_group_container">
              <el-card>
                <TagGroup />
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
// @ is an alias to /src
import AXIOS from "../request/request";
import MainHeader from "@/components/MainHeader.vue";
import TopicList from "@/components/TopicList.vue";
import TagGroup from "@/components/TagGroup.vue";

export default {
  name: "Home",
  components: {
    MainHeader,
    TopicList,
    TagGroup,
  },
  data() {
    return {
      topics: [],
      isLoadTopics: false,
    };
  },
  methods: {
    async getTopicList() {
      await AXIOS.get("/topics").then((res) => {
        const response = res.data;
        if (response.code === 200) {
          console.log(response.data);
          this.topics = response.data;
          this.isLoadTopics = true;
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    this.getTopicList();
  },
};
</script>
<style scoped>
.el-container {
  height: 100%;
}
.new_topic_container {
  display: flex;
  align-items: center;
}

.new_topic_container .el-link {
  margin-left: 16px;
}

.tag_group_container {
  margin-top: 16px;
}

.home_aside_container {
  margin-left: 16px;
}
</style>