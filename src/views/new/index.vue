<template>
  <el-container direction="vertical">
    <MainHeader />
    <div class="main-content-container">
      <el-row>
        <el-col :span="24">
          <ChangeTopic
            @postTopic="onPostTopicSubmit"
            :topic="{
              tag: {},
            }"
          />
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import ChangeTopic from "@/components/ChangeTopic.vue";
import AXIOS from "../../request/request";

export default {
  components: { MainHeader, ChangeTopic },
  methods: {
    async onPostTopicSubmit(topic) {
      const data = {
        title: topic.title,
        content: topic.content,
        ownTagId: topic.tagId,
        publishTime: new Date(),
      };
      await AXIOS.post("/topics", data).then((response) => {
        let res = response.data;
        if (res.code === 200) {
          this.$message({
            message: "发布文章成功",
            type: "success",
          });
          this.$router.push("/");
        }
      });
    },
  },
};
</script>