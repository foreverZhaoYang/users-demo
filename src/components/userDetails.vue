<template>
  <div class="userD-container">
    <!-- //卡片组件 -->
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>用户信息</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back()">返回</el-button>
  </div>
  <div class="text item">
   <p> 姓名：{{userInfo.name }}</p>
   <p>年龄：{{userInfo.age}}</p>
   <p>职位：{{userInfo.position}}</p>
  </div>
</el-card>
  </div>
</template>

<script>
export default {
    props:['id'],
    data() {
        return {
            userInfo:{}
        }
    },
    created() {
        this.getUserDetails(this.id);
    },
    methods: {
        async getUserDetails(id){
            const {data:res}=await this.$http.get('/api/users/'+id);
            if(res.status!==0) this.$message.error('获取用户详情失败!');
            this.userInfo=res.data;
        }
    },
}
</script>

<style>

</style>