<template>
  <el-container>
    <el-main height="400" style="padding: 0;">
      <div class="nav">
        <el-row>
          <el-col :span="12" :offset="0" style="padding: 0 10px;">
            <div class="logo">
              <span class="text-ekballo">
                EKBALLO
              </span>
              <span class="text-chat">
                CHAT
              </span>
            </div>
          </el-col>
          <el-col :span="12" :offset="0" style="padding: 0 10px; text-align: right;">
            <NuxtLink to="auth/login">
              Login
            </NuxtLink>

            <!-- <NuxtLink to="auth/register"> -->
            <!-- Register -->
            <!-- </NuxtLink> -->
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  auth: 'guest',
  mounted () {
    this.$cg({
      title: 'Index : Auth',
      type: 'log',
      logs: [
        this.$auth.loggedIn,
        this.$auth.user
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background: #1f91f2;
  color: white;
  height: 40px;
  line-height: 40px;
  width: 100%;

  a {
    color: white;
    text-decoration: none;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;
    margin-left: 5px;
    transition: all 200ms ease-in-out;

    &:hover {
      color: #1f91f2;
      background: white;
    }
  }
}

.logo {
  .text {
    &-ekballo {
      font-weight: 900;
    }

    &-chat {
      font-weight: 300;
    }
  }
}
</style>
