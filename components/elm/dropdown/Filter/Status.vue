<template>
  <div :key="key">
    <el-dropdown @command="handleClick">
      <el-button type="primary">
        status
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="status in client_status"
          :key="status.id"
          :command="status.id"
        >
          {{ status.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      key: 0
    }
  },
  computed: {
    ...mapGetters({
      client_status: 'statuses/statuses'
    })
  },

  methods: {
    handleClick (param) {
      this.$emit('status', param)
    }
  }
}
</script>
