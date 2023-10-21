import { computed } from 'vue'
import { useStore } from 'vuex'
// 购物车相关逻辑
const useCartListEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, step) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, step })
  }
  const productList = computed(() => {
    const productList = cartList[shopId].productList || { }
    return productList
  })

  const shopName = computed(() => {
    const productList = cartList[shopId].shopName || ''
    return productList
  })

  const calculations = computed(() => {
    const productList = cartList?.[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.checked) {
          result.total += product.count
          result.price += product.count * product.price
        }
        if (product.count > 0 && !product.checked) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { cartList, changeCartItemInfo, productList, shopName, calculations }
}

export { useCartListEffect }
