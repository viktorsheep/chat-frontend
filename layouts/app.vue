<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside width="250px" style="background-color: #1f91f2;">
        <div style="background: #0003; height: 50px; line-height: 50px; padding-top: 10px;">
          <Logo />
        </div>
        <NavUser v-if="$auth.user.user_role_id === 3" />
        <NavAdmin v-if="$auth.user.user_role_id === 1" />
      </el-aside>

      <el-container>
        <el-header style="line-height: 60px; text-align: right; background: #eee;">
          <span v-if="$auth.user.user_role_id === 1" style="color: #E6A23C; float: left;">Super Admin &nbsp;</span>
          <ElmDropdownTopBarPage />

          <el-dropdown
            trigger="click"
            style="cursor: pointer;"
            @command="handleDropdownCommand"
          >
            <span class="el-dropdown-link">
              <span>{{ $auth.user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>
                Profile
              </el-dropdown-item>
              <el-dropdown-item disabled>
                Preferences
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                Logout
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main style="background: white;">
          <Nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  mounted () {
    // console.log(this.$auth.loggedIn)
    this.$FbInit()
  },
  methods: {
    handleDropdownCommand (command) {
      if (command === 'logout') {
        this.$auth.logout().then((res) => {
          console.log(this.$auth.loggedIn)
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style>
  body {
    font-family: Nunito, sans-serif;
    color: #454545;
    font-size: 16px;
    margin: 0;
  }
</style>

<style lang="scss">
  $brandColor: #1f91f2;
</style>
