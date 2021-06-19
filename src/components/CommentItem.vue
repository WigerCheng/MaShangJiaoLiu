<template>
  <div class="comment_container">
    <div>
      <span class="comment_owner_name">{{ item.user.username }}</span>
      <span class="comment_time">{{ item.commentTime }}</span>
    </div>
    <p>{{ item.commentContent }}</p>
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
  background-color: orchid;
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
</style>