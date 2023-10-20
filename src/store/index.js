import { createStore } from 'vuex'

export default createStore({
  state: {
    // 第一层为店铺id，第二层的key为商品id，详情为商品数量和商品详情
    cartList: {}
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, step } = payload
      const shopInfo = state.cartList[shopId] || {}
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      if (product.count + step >= 0) {
        product.count += +step
      }
      if (step > 0) {
        product.checked = true
      }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.checked = !product.checked
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.checked = true
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
