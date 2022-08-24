<template>
  <el-form ref="form" label-position="right" :model="form" :rules="rules">
    <el-form-item prop="name">
      <el-input v-model="form.name" placeholder="Page Name" />
    </el-form-item>

    <el-form-item prop="page_id">
      <el-input v-model="form.page_id" placeholder="Page ID" />
    </el-form-item>

    <el-form-item prop="url">
      <el-input v-model="form.url" placeholder="Page URL" />
    </el-form-item>

    <el-form-item prop="contact_person">
      <el-input v-model="form.contact_person" placeholder="Contact Person" />
    </el-form-item>

    <el-form-item prop="access_token">
      <el-input v-model="form.access_token" placeholder="Access Token" />
    </el-form-item>

    <el-form-item>
      Active &nbsp; : <el-switch v-model="form.is_active" />
    </el-form-item>
  </el-form>
</template>

<script>
import * as R from 'ramda'
export default {
  props: {
    reset: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default () {
        return null
      }
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        page_id: '',
        url: '',
        contact_person: '',
        access_token: '',
        is_active: false
      },
      rules: {
        name: [
          { required: true, message: "Please input the Page's name", trigger: 'blur' }
        ],
        page_id: [
          { required: true, message: 'Page ID is required.', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'Page URL is required.', trigger: 'blur' }
        ],
        contact_person: [
          { required: true, message: 'Contact person is required.', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    form: {
      handler (n, o) {
        this.$emit('formChanged', n)
      },
      deep: true
    },

    editMode: {
      handler (n, o) {
        if (n) {
          if (this.editData !== null) {
            this.form = R.clone(this.editData)
          }
        }
      }
    },

    reset: {
      handler (n, o) {
        if (n === true) {
          this.$refs.form.resetFields()
          this.$emit('formReset')
        }
      }
    }
  },
  mounted () {
    if (this.editMode) {
      if (this.editData !== null) {
        this.form = R.clone(this.editData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  .el-form-item__label {
    padding-bottom: 0 !important;
  }
}
.el-form-item__label {
  padding-bottom: 0 !important;
}
</style>
