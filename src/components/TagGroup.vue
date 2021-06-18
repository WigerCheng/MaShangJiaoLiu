<template>
  <div class="tags_container">
    <el-tag v-for="tag in tags" :key="tag.tagId">{{ tag.tagName }}</el-tag>
  </div>
</template>

<script>
import AXIOS from "../request/request";
export default {
  data() {
    return {
      tags: [],
    };
  },
  methods: {
    getTagList() {
      AXIOS.get("/tags").then((res) => {
        const response = res.data;
        if (response.code === 200) {
          this.tags = response.data;
        } else {
          console.log("出错");
        }
      });
    },
  },
  created() {
    this.getTagList();
  },
};
</script>

<style scoped>
.tags_container {
  display: flex;
  flex-wrap: wrap;
}

.tags_container .el-tag {
  margin: 4px;
}
</style>