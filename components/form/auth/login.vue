<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="medium"
  >
    <el-form-item label="" prop="email">
      <el-input v-model="form.email" placeholder="Your Email" />
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input
        v-model="form.password"
        placeholder="Your Password"
        show-password
      />
    </el-form-item>

    <el-form-item style="text-align: center">
      <el-button type="primary" @click="handleLogin">
        Login
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter you email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleLogin (e) {
      e.preventDefault()
      try {
        await this.$auth.loginWith('backend', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        }).then((res) => {
          console.log(res)

          this.$axios.setHeader('Authorization', res.data.access_token)
          // this.$axios.strategy.token.set(res.data.access_token, 'Bearer')
          this.$auth.setUserToken(res.data.access_token)
            .then((res) => {
              console.log(this.$auth.user)
              this.$router.push(`${this.$auth.user.user_role_id !== 3 ? '/admin/dashboard' : '/pages'}`)
              this.$message({
                showClose: true,
                message: `Welcome back ${this.$auth.user.name}.`,
                type: 'success'
              })
            })

          console.log(this.$auth.loggedIn)
        })
      } catch (err) {
        this.$cg({
          title: 'Login Error',
          type: 'error',
          logs: err
        })

        this.$message({
          message: 'Your email or password is incorrect',
          type: 'error'
        })
      }
    }
  }

}
</script>
