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
import AXIOS from "../request/request";
import CommentItem from "../components/CommentItem.vue";
export default {
  // props: ["topicId"],
  components: {
    CommentItem,
  },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    getCommentList(id) {
      AXIOS.get(`/comments/${id}`).then((res) => {
        const response = res.data;
        if (response.code === 200) {
          this.comments = response.data;
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    let topicId = this.$store.state.topicId;
    this.getCommentList(topicId);
  },
};
</script>

<style>
</style>