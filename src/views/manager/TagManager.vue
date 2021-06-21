<template>
  <el-card>
    <el-button type="primary" @click="onNewTag">添加主题</el-button>
    <TagGroup @tagclick="onEditTag($event)" style="margin-top: 16px" />
  </el-card>
  <el-dialog
    :title="isNew ? '添加主题标签' : '修改主题标签'"
    v-model="isDialogVisible"
    width="50%"
  >
    <el-form
      :model="tagForm"
      label-width="80px"
      ref="tagForm"
      :rules="tagRules"
    >
      <el-form-item label="标签内容" prop="tagName">
        <el-input v-model="tagForm.tagName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateorNewTag('tagForm')"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import "@/components/TagGroup.vue";
import TagGroup from "../../components/TagGroup.vue";
import AXIOS from "../../request/request";
export default {
  components: {
    TagGroup,
  },
  data() {
    return {
      isDialogVisible: false,
      isNew: false,
      tagForm: {
        tagId: null,
        tagName: "",
      },
      tagRules: {
        tagName: [
          {
            required: true,
            message: "请输入标签内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onNewTag() {
      this.isNew = true;
      this.tagForm = {
        tagName: "",
      };
      this.isDialogVisible = true;
    },
    onEditTag(tag) {
      this.isNew = false;
      this.tagForm = tag;
      this.isDialogVisible = true;
    },
    onUpdateorNewTag(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onUpdateorNewTagSubmit();
        } else {
          return false;
        }
      });
    },
    async onUpdateorNewTagSubmit() {
      if (this.isNew) {
        await AXIOS.post("/tags", this.tagForm).then((res) => {
          let code = res.data.code;
          if (code === 200) {
            this.$message({
              message: "新增Tag成功",
              type: "success",
            });
            this.isDialogVisible = false;
          } else if (code === 201) {
            this.$message({
              message: "添加失败，Tag已存在",
              type: "error",
            });
          }
        });
      } else {
        let tagId = this.tagForm.tagId;
        delete this.tagForm.tagId;
        await AXIOS.put(`/tags/${tagId}`, this.tagForm).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: "修改Tag成功",
              type: "success",
            });
            this.isDialogVisible = false;
          }
        });
      }
    },
  },
};
</script>

<style>
</style>