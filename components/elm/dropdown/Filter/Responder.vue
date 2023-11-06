<template>
  <div :key="key">
    <el-dropdown @command="handleClick">
      <el-button type="primary">
        responders
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="r in responders"
          :key="r.id"
          :command="r.id"
        >
          <span v-if="r.user_role_id !== 2 && r.user_role_id !== 1">
            {{ r.name }}
          </span>
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
      responders: 'users/users'
    })
  },

  methods: {
    handleClick (param) {
      this.$emit('responder', param)
    }
  }
}
</script>
