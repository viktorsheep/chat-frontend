<template>
  <div>
    {{ $route.params }}
  </div>
</template>

<script>
export default {
  layout: 'app',
  mounted () {
    console.log(this.$route)
  }
}
</script>
