import { toRefs } from 'vue'
import { useStore } from 'vuex'
// 购物车相关逻辑
const useCartListEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeCartItemInfo = (shopId, productId, productInfo, step) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, step })
  }
  return { cartList, changeCartItemInfo }
}

export { useCartListEffect }
