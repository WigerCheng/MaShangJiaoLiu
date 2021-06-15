<template>
  <el-container>
    <el-header>
      <MainHeader />
    </el-header>
  </el-container>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "Home",
  components: {
    MainHeader,
  },
};
</script>
