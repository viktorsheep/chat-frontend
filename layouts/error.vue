<template>
  <div class="container" style="text-align: center;">
    <h1 style="font-size: 48px; margin: 50px auto; color: #F56C6C; margin-top: 100px;">
      <i :class="error.statusCode === 404 ? 'el-icon-document-delete' : 'el-icon-error'" />
    </h1>

    <h1 style="font-size: 46px; margin: 0 auto; color: #ccc;">
      Toink!
      <br>
      {{ error.statusCode === 404 ? 'Page not found.' : 'An error occurred.' }}
    </h1>

    <h1 style="font-size: 60px; margin: 50px auto; color: #ccc;">
      {{ error.statusCode }}
    </h1>

    <p style="color: #999;">
      {{ error.message }}
    </p>

    <NuxtLink to="/">
      <el-button type="primary" icon="el-icon-s-home">
        Back to Home
      </el-button>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'app',
  props: ['error'],
  mounted () {
    console.error(this.error)
  }
}
</script>
