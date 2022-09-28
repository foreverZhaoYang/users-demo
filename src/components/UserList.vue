<template>
  <div class="userlist-container">
    <!-- 按钮 -->
    <el-row>
      <el-button
        type="primary"
        round
        @click="dialogVisible = true"
        style="margin: 15px"
        >添加用户</el-button
      >
    </el-row>

    <!-- 表格部分 -->
    <el-table :data="userList" border stripe>
      <el-table-column prop="id" label="#"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="position" label="地位"> </el-table-column>
      <el-table-column prop="addtime" label="添加时间">
        <!-- 这里组件提供了默认插槽 -->
      </el-table-column>
      <el-table-column label="操作">
        <!-- 这里组件提供了默认插槽 -->
       <template #default="{row}">
       <router-link :to="'/users/userinfo/'+row.id">详情</router-link>&nbsp;
        <a href="javascript:;" @click="removeUser(row.id)">删除</a>
       </template>
      </el-table-column>
    </el-table>

    <!-- 遮罩层，Dialog 对话框，填写信息部分 -->
    <el-dialog
      title="请填写信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="hasClose"
    >
      <!-- 表单内容 -->
      <span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="地位" prop="position">
            <el-input v-model.trim="ruleForm.position"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    let checkAge = (rule, value, cb) => {
      if (!Number.isInteger(value)) {
        return cb(new Error("年龄是个整数哟~"));
      }
      if (value > 300 || value < 1) {
        return cb(new Error("请输入合适的年龄，除非你是仙"));
      }
      cb();
    };
    return {
      userList: [],
      dialogVisible: false,

      ruleForm: {
        name: "",
        age: "",
        position: "",
      },
      rules: {
        name: [
          { required: true, message: "姓名年龄不能为空", trigger: "blur" },
          {
            min: 3,
            max: 19,
            message: "姓名长度在 3 到 9 个字符",
            trigger: "blur",
          },
        ],
        age: [
          { required: true, message: "年龄不能为空", trigger: "blur" },
          { validator: checkAge, trigger: "blur" },
        ],
        position: [
          { required: true, message: "职位不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("/api/users");
      if (res.status != 0) return console.log("获取用户数据失败！");
      console.log(res);
      this.userList = res.data;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    hasClose() {
      this.$refs.ruleForm.resetFields();
    },
    addUserInfo() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return console.log("校验失败！");
        // 校验成功后
        const { data: res } = await this.$http.post("api/users", this.ruleForm);
        if (res.status !== 0) return this.$message.error("添加用户失败！");
        // console.log('添加用户成功！');
        // 调用message消息提示组件,elementUi真好用
        this.$message.success("添加用户成功！");
        this.getUserList();
        this.dialogVisible = false;
      });
    },
    async removeUser(id) {
      const confirmResult=await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => {
         console.log(err.message);
        });
        if(confirmResult!=='confirm') return this.$message.info('取消了删除');
       const {data:res} = await this.$http.delete('/api/users/'+id);
       if(res.status!==0) return this.$message.error('删除失败');
       this.getUserList();
        this.$message({
            type: "success",
            message: "删除成功!",
});
    },
  },
};
</script>

<style>
</style>