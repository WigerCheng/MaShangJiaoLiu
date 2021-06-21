<template>
  <ul>
    <TopicItem v-for="topic in topics" :key="topic.topicId" :topicItem="topic">
    </TopicItem>
  </ul>
</template>

<script>
import TopicItem from "./TopicItem.vue";

export default {
  props: ["topicList"],
  data() {
    return {
      topics: this.topicList,
    };
  },
  components: { TopicItem },
};
</script>

<style scoped>
ul{
  background-color: #e2e2e2;
}
</style>