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
      <el-input v-model="form.email" placeholder="Your Email" :disabled="disabled.btn.login" />
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input
        v-model="form.password"
        placeholder="Your Password"
        show-password
        :disabled="disabled.btn.login"
      />
    </el-form-item>

    <el-form-item style="text-align: center">
      <el-button type="primary" :disabled="disabled.btn.login" @click="handleLogin">
        <i v-if="disabled.btn.login" class="el-icon-loading" />
        {{ disabled.btn.login ? 'Logging In' : 'Login' }}
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
      },

      disabled: {
        btn: {
          login: false
        }
      }
    }
  },
  methods: {
    async handleLogin (e) {
      e.preventDefault()
      this.disabled.btn.login = true

      try {
        await this.$auth.loginWith('backend', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        }).then((res) => {
          this.$router.push(`${this.$auth.user.user_role_id !== 3 ? '/admin/dashboard' : '/pages'}`)

          this.$axios.setHeader('Authorization', res.data.access_token)
          this.$auth.setUserToken(res.data.access_token)
            .then((res) => {
              this.disabled.btn.login = false
              this.$router.push(`${this.$auth.user.user_role_id !== 3 ? '/admin/dashboard' : '/pages'}`)
              this.$message({
                showClose: true,
                message: `Welcome back ${this.$auth.user.name}.`,
                type: 'success'
              })
            })
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

        this.disabled.btn.login = false
      }
    }
  }

}
</script>
