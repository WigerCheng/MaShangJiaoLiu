<template>
  <ul>
    <TopicItem v-for="topic in topics" :key="topic.topicId" :topicItem="topic">
    </TopicItem>
  </ul>
</template>

<script>
import TopicItem from "./TopicItem.vue";
import AXIOS from "../request/request";

export default {
  data() {
    return {
      topics: [],
    };
  },
  components: { TopicItem },
  methods: {
    getTopicList() {
      AXIOS.get("/topics").then((res) => {
        const response = res.data;
        if (response.code === 200) {
          this.topics = response.data;
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    this.getTopicList();
    console.log("请求数据");
  },
};
</script>

<style>
</style>