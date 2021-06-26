<template>
  <div class="topic_item_container">
    <p class="topic_title">
      <router-link
        :to="{ name: 'TopicDetail', params: { topicId: item.topicId } }"
      >
        {{ item.title }}
      </router-link>
    </p>
    <span class="tag">{{ item.tag.tagName }}</span> •
    <span>{{ item.user.username }}</span> •
    <span class="time">{{ format(item.publishTime) }}</span>
  </div>
</template>

<script>
import formatTime from "../time";
export default {
  props: ["topicItem"],
  data() {
    return {
      item: this.topicItem,
    };
  },
  methods: {
    format(time) {
      return formatTime(time);
    },
  },
};
</script>

<style scoped>
.topic_item_container {
  background-color: white;
  line-height: 1.6;
  padding: 16px;
  margin-top: 1px;
  margin-bottom: 1px;
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

.tag {
  padding: 4px;
  font-size: 12px;
  line-height: 12px;
  display: inline-block;
  padding: 4px;
  background-color: #e2e2e2;
  color: #777;
  border-radius: 2px;
}

.time {
  font-size: 12px;
  color: #ccc;
}
</style>