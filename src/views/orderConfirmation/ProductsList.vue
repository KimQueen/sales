<template>
  <div class="products">
    <div class="products_title">{{ shopName }}</div>
    <div class="products_list">
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product_item">
          <img class="product_item_imgs" :src="item.imgUrl" />
          <div class="product_item_detail">
            <h4 class="product_item_title">{{ item.name }}</h4>
            <p class="product_item_price">
              <span class="product_item_yen"
                >¥ {{ item.price }} x {{ item.count }}</span
              >
              <span class="product_item_total"
                >¥ {{ (item.price * item.count).toFixed(2) }}</span
              >
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { useCartListEffect } from '../../effects/cartEffect'
import { useRoute } from 'vue-router'
export default {
  name: 'ProductsList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCartListEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/mixin.scss";
.products {
  border-radius: 0.04rem;
  margin: 0.16rem 0.18rem 0.55rem 0.18rem;
  background: #fff;
  .products_title {
    font-size: 0.16rem;
    line-height: 0.22rem;
    padding: 0.16rem 0.16rem 0 0.16rem;
    color: #333;
    font-weight: 500;
  }
  .product_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0.16rem;
    .product_item_imgs {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
  }
  .product_item_title {
    @include ellipsis;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #333;
    margin: 0;
  }
  .product_item_price {
    display: flex;
    justify-content: space-between;
    margin: 0.06rem 0 0 0;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #e93b3b;
  }
  .product_item_total {
    font-size: 0.12rem;
    color: #000;
  }
  .product_item_yen {
    font-size: 0.12rem;
  }
  .product_item_detail {
    flex: 1;
    overflow-x: hidden;
  }
}
</style>
