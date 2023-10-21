<template>
  <div class="order">
    <div class="order_price">
      实付金额：¥<b>{{ calculations.price }}</b>
    </div>
    <div class="order_btn" @click="()=>{handleSumbitClick(true)}">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="()=>{handleSumbitClick(false)}">
    <div class="mask_content" @click.stop>
      <div class="mask_content_title">确认要离开收银台</div>
      <div class="mask_content_desc">请尽快完成支付，否则将会被取消</div>
      <div class="mask_content_btns">
        <div class="mask_content_first_btn" @click="()=>handleConfirmOrder(true)">
          取消订单
        </div>
        <div class="mask_content_second_btn" @click="()=>handleConfirmOrder(false)">
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useCartListEffect } from '../../effects/cartEffect'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import { ref } from 'vue'

// 与下单相关的逻辑
const useConfirmOrderEffect = (productList, shopName, shopId) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []

    for (const i in productList.value) {
      const product = productList.value[i]
      if (product.count > 0) {
        products.push({ id: product._id, num: product.count })
      }
    }
    const params = {
      addressId: 1,
      shopId,
      shopName: shopName.value,
      isCanceled,
      products
    }
    const result = await post('/order', params)
    if (result?.error === 0) {
      store.commit('cleanCartProducts', { shopId })
      router.push({ name: 'OrderList' })
    }
  }
  return { handleConfirmOrder }
}

// confirm展示相关的逻辑

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSumbitClick = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleSumbitClick }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = route.params.id

    const { calculations, shopName, productList } = useCartListEffect(shopId)
    const { handleConfirmOrder } = useConfirmOrderEffect(productList, shopName, shopId)
    const { showConfirm, handleSumbitClick } = useShowMaskEffect()

    return { calculations, handleConfirmOrder, showConfirm, handleSumbitClick }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/mixin.scss";
.order {
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: #fff;
  width: 100%;
  bottom: 0;
  height: 0.49rem;
  line-height: 0.49rem;
  .order_price {
    margin-left: 0.24rem;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: #333;
  }
  .order_btn {
    color: #fff;
    background: #4fb0f9;
    width: 0.98rem;
    text-align: center;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  .mask_content {
    padding: 0.24rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.6rem;
    background: #fff;
    border-radius: 0.04rem;
    .mask_content_title {
      line-height: 0.26rem;
      font-size: 0.18rem;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
    .mask_content_desc {
      margin-top: 0.08rem;
      text-align: center;
      font-size: 0.14rem;
      color: #666;
    }
    .mask_content_btns {
      margin: 0.24rem 0.3rem 0 0.3rem;
      display: flex;
      .mask_content_first_btn {
        width: 0.8rem;
        height: 0.32rem;
        line-height: 0.3rem;
        border-radius: 0.16rem;
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
        text-align: center;
        vertical-align: middle;
      }
      .mask_content_second_btn {
        margin-left: 0.32rem;
        width: 0.8rem;
        height: 0.32rem;
        line-height: 0.3rem;
        border-radius: 0.16rem;
        background: #4fb0f9;
        color: #fff;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}
</style>
