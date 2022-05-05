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
    <el-form-item label="" prop="name">
      <el-input v-model="form.name" placeholder="Your Name" />
    </el-form-item>

    <el-form-item label="" prop="email">
      <el-input v-model="form.email" placeholder="Your Email" />
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input v-model="form.password" type="password" placeholder="Your Password" />
    </el-form-item>

    <el-form-item label="" prop="password_confirmation">
      <el-input v-model="form.password_confirmation" type="password" placeholder="Confirm Your Password" />
    </el-form-item>

    <el-form-item style="text-align: center;">
      <el-button type="primary" @click="onSubmit">
        Register
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        console.log(value)
        callback(new Error('Please input the password'))
      // } else if (value.length < 8) {
        // callback(new Error('Password must be more than 8 characters.'))
      } else {
        if (this.form.password_confirmation !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Passwords doesn\'t match!'))
      } else {
        callback()
      }
    }

    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please enter you name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter you email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
          this.$sender({
            method: 'post',
            url: 'auth/register',
            data: this.form,
            message: {
              success: 'You are registered! Login again to continue.'
            }
          }).then((res) => {
            this.$router.push('/auth/login')
          }).catch((err) => {
            this.$cg({
              type: 'error',
              title: 'Register Error',
              logs: err
            })

            this.$notify.error({
              title: 'Sorry, something went wrong.',
              message: 'We couldn\'t register you.'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    validateOne (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.password_confirmation !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
  }
}
</script>
