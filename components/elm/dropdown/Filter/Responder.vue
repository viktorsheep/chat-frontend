<template>
  <div :key="key">
    <el-tooltip effect="dark" content="Select responder." placement="bottom">
      <el-button style="background-color: white" icon="el-icon-sort" @click="drawer = true" />
    </el-tooltip>

    <el-drawer
      title="Select Responders"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="100vh"
      class="drawer"
    >
      <div>
        <el-row>
          <el-checkbox-group v-model="selectedResponders">
            <el-col v-for="r in getResponders" :key="r.id" :span="parseInt(isMobile ? 12 : 6)">
              <div style="padding: 20px 20px 20px 40px;">
                <el-checkbox border :label="r.id">
                  {{ r.name }}
                </el-checkbox>
              </div>
            </el-col>
          </el-checkbox-group>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="0">
            <div style="text-align: right; padding: 60px">
              <el-button type="default" size="default" @click="handleCancel">
                Cancel
              </el-button>
              <el-button type="primary" size="default" @click="handleFilter">
                Filter
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    responders: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      key: 0,
      drawer: false,
      direction: 'ttb',
      selectedResponders: this.responders
    }
  },
  computed: {
    ...mapGetters({
      getResponders: 'users/users',
      isMobile: 'settings/isMobile'
    })
  },
  watch: {
    responders (n, o) {
      this.selectedResponders = n
    }
  },

  methods: {
    handleFilter () {
      this.$emit('responders', this.selectedResponders)
      this.drawer = false
    },
    handleCancel () {
      this.selectedResponders = []
      this.drawer = false
    },
    handleClose (done) {
      this.$confirm('Are you sure you want to close this?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style lang="scss">

</style>
