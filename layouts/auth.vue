<template>
  <div style="width: 100%; height: 100vh; background: #1f91f2;">
    <el-row :gutter="0">
      <el-col :span="24" :offset="0">
        <div class="page-name">
          <div class="title">
            Welcome <span v-if="pageName === 'login'">back</span> to Ekballo Chat!
          </div>

          <div class="sub-title">
            Please continue to {{ pageName }}
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4" :offset="10">
        <div class="wrap">
          <Nuxt />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  computed: {
    pageName () {
      const pageName = this.$route.path.split('/')
      return pageName[2]
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-name {
    margin-top: 180px;
    text-align: center;
    margin-bottom: 20px;
    color: #eee;

    .title {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .wrap {
    padding: 20px;
    // box-shadow: 1px 1px 20px 0px #eee;
    background: white;
    border-radius: 10px;
  }
</style>
