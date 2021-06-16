<template>
  <el-container>
    <el-header>
      <MainHeader />
    </el-header>
    <el-row>
      <el-col :span="16">
        <el-main>
          <TopicList />
        </el-main>
      </el-col>
      <el-col :span="8">
        <el-aside> </el-aside>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";
import TopicList from "@/components/TopicList.vue";

export default {
  name: "Home",
  components: {
    MainHeader,
    TopicList,
  },
  data() {
    return {};
  },
};
</script>
