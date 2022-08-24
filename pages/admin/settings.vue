<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Notification" name="notification">
      <AdminSettingsNotification />
    </el-tab-pane>
    <el-tab-pane label="Config" name="second" disabled>
      Config
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  layout: 'app',
  data () {
    return {
      activeName: 'notification'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
