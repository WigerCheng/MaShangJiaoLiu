<template>
  <div class="topic_item_container">
    <p class="topic_title">{{ item.title }}</p>
    <span>{{ item.author }} • {{ item.publishTime }}</span>
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
  text-align: left;
}

.topic_title {
  font-size: 18px;
  font-weight: 600;
}
</style>