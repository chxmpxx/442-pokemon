<template>
  <div>
      <counter init-number="0"></counter>
      <counter init-number="0"></counter>
      <counter init-number="0"></counter>
      <counter></counter>
  </div>
</template>

<script>
import Counter from '@/components/Counter'

export default {
    components: {
        Counter
    }
}
</script>

<style lang="scss" scoped>

</style>