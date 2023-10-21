<template>
  <div class="wrapper">
    <TopArea/>
    <ProductsList />
    <Order/>
  </div>
</template>
<script>
import TopArea from './TopArea.vue'
import ProductsList from './ProductsList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductsList, Order }
}
</script>

<style scoped lang="scss">
.wrapper {
  background: #eee;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
</style>
