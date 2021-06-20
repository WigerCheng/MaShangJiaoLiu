<template>
  <ul>
    <CommentItem
      v-for="comment in comments"
      :key="comment.commentId"
      :commentItem="comment"
    >
    </CommentItem>
  </ul>
</template>

<script>
import CommentItem from "../components/CommentItem.vue";
export default {
  props: ["commentList"],
  components: {
    CommentItem,
  },
  data() {
    return {
      comments: this.commentList,
    };
  },
};
</script>

<style>
</style>