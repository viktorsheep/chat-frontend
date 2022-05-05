<template>
  <FormAuthLogin />
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'memberOnly',
  mounted () {
  }
}
</script>
