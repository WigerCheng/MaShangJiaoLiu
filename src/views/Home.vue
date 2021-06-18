<template>
  <el-container>
    <el-header>
      <MainHeader />
    </el-header>
    <el-row>
      <el-col :span="18">
        <el-main>
          <TopicList />
        </el-main>
      </el-col>
      <el-col :span="6">
        <el-aside>
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
        </el-aside>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
// @ is an alias to /src
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
    return {};
  },
};
</script>
<style scoped>
.new_topic_container {
  display: flex;
  align-items: center;
}

.new_topic_container .el-link {
  margin-left: 16px;
}

.tag_group_container {
  margin-top: 24px;
}

.el-main {
  padding-top: 0;
}
</style>