<template>
  <div :key="key">
    <el-select
      v-model="selectedStatuses"
      multiple
      collapse-tags
      clearable
      placeholder="Select status"
      :style="{ width: '200px', padding: '0px' }"
      @change="handleChange"
    >
      <el-option
        v-for="status in client_status"
        :key="status.id"
        :label="status.name"
        :value="status.id"
      />
    </el-select>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    statuses: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      key: 0,
      selectedStatuses: this.statuses
    }
  },
  computed: {
    ...mapGetters({
      client_status: 'statuses/statuses'
    })
  },

  watch: {
    statuses (n, o) {
      this.selectedStatuses = n
    }
  },

  methods: {
    handleChange () {
      this.$emit('status', this.selectedStatuses)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
