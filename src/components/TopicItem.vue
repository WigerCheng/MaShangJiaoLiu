<template>
  <div class="topic_item_container">
    <p class="topic_title">
      <router-link
        :to="{ name: 'TopicDetail', params: { topicId: item.topicId } }"
      >
        {{ item.title }}
      </router-link>
    </p>
    <span>{{ item.user.username }} • {{ item.publishTime }}</span>
  </div>
</template>

<script>
export default {
  props: ["topicItem"],
  data() {
    return {
      item: this.topicItem,
    };
  },
};
</script>

<style scoped>
.topic_item_container {
  background: cadetblue;
  line-height: 1.6;
  padding: 16px;
  margin-top: 2px;
  margin-bottom: 2px;
  text-align: left;
}

.topic_title a {
  font-size: 16px;
  font-weight: 600;
  color: #4d5256;
}
.topic_title a:hover {
  color: #4d5256;
  text-decoration: underline;
}
</style>