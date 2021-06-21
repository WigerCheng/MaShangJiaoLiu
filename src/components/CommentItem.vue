<template>
  <div class="comment_container">
    <div>
      <span class="comment_owner_name">{{ item.user.username }}</span>
      <span class="comment_time">{{ item.commentTime }}</span>
    </div>
    <p class="comment_content">{{ item.commentContent }}</p>
  </div>
</template>

<script>
export default {
  props: ["commentItem"],
  data() {
    return {
      item: this.commentItem,
    };
  },
};
</script>

<style scoped>
.comment_container {
  padding: 8px;
  background-color: white;
  margin-top: 1px;
  margin-bottom: 1px;
}

.comment_owner_name {
  font-weight: bold;
}

.comment_time {
  margin-left: 24px;
  margin-top: 8px;
  font-size: 11px;
  color: #ccc;
}

.comment_content {
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
</style>