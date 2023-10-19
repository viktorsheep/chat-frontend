<template>
  <div>
    <h1 style="text-align: center;">
      Sorry. Conversation with user is not found.
    </h1>

    <div style="text-align: center;">
      <nuxt-link to="/pages">
        <el-button type="primary">
          Back to Home
        </el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'redirects'
}
</script>
