<template>
<div class="mask" v-if="showCart" @click="showCartModal"/>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product_header">
        <div class="product_header_all">
          <span
            class="product_header_icon iconfont"
            v-html="allChecked ? '&#xe652;' : '&#xe731;'"
            @click="
              () => {
                setCartItemsChecked(shopId);
              }
            "
          />
          全选
        </div>
        <div class="product_header_clear">
          <span  @click="
            () => {
              cleanCartProducts(shopId);
            }
          ">清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product_item">
          <div
            class="iconfont procuct_item_checked"
            v-html="item.checked ? '&#xe652;' : '&#xe731;'"
            @click="
              () => {
                changeCartItemChecked(shopId, item._id);
              }
            "
          />
          <img class="product_item_imgs" :src="item.imgUrl" />
          <div class="product_item_detail">
            <h4 class="product_item_title">{{ item.name }}</h4>
            <p class="product_item_price">
              <span class="product_item_yen">¥</span>{{ item.price }}
              <span class="product_item_origin">¥{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product_number">
            <span
              class="product_number_minus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            {{ item?.count || 0 }}
            <span
              class="product_number_plus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <diiv class="check_icon">
        <img
          src="https://www.dell-lee.com/imgs/vue3/basket.png"
          class="icon_img"
          @click="showCartModal"
        />
        <div class="check_icon_tag">{{ total }}</div>
      </diiv>
      <div class="check_info">
        总计：<span class="check_info_price">¥ {{ price }}</span>
      </div>
      <div class="check_btn">
        <router-link :to ="{name: 'Home'}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCartListEffect } from './commonCartEffect'

const useCartEffect = (shopId) => {
  const { changeCartItemInfo } = useCartListEffect()
  const store = useStore()
  const cartList = store.state.cartList
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.checked) {
          count += product.count
        }
      }
    }
    return count
  })

  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.checked) {
          count += product.count * product.price
        }
      }
    }
    return count.toFixed(2)
  })

  const productList = computed(() => {
    const productList = cartList[shopId] || {}
    return productList
  })

  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.checked) {
          result = false
        }
      }
    }
    return result
  })
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = () => {
    store.commit('setCartItemsChecked', { shopId })
  }
  return {
    total,
    price,
    productList,
    allChecked,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}

const useShowCartEffect = () => {
  const showCart = ref(false)
  const showCartModal = () => {
    showCart.value = !showCart.value
  }
  return { showCartModal, showCart }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, showCartModal } = useShowCartEffect()
    const {
      total,
      price,
      productList,
      allChecked,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId)
    return {
      total,
      price,
      productList,
      shopId,
      allChecked,
      showCart,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCartModal
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1;
}

.cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
  z-index: 2;
  background: #fff;
}
.check {
  display: flex;
  justify-content: space-between;
  .check_icon {
    position: relative;
    width: 0.84rem;
    .check_icon_tag {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 50%;
      font-size: 0.12rem;
      text-align: center;
      line-height: 0.2rem;
      color: #fff;
      right: 0.2rem;
      top: 0.04rem;
      transform: scale(0.5);
    }
    .icon_img {
      margin: 0.12rem auto;
      display: block;
      width: 0.28rem;
      height: 0.26rem;
    }
  }
  .check_info {
    flex: 1;
    color: #333;
    line-height: 0.5rem;
    font-size: 0.12rem;
    .check_info_price {
      color: #e93b3b;
      font-size: 0.18rem;
    }
  }
  .check_btn {
    text-align: center;
    width: 0.98rem;
    line-height: 0.5rem;
    color: #fff;
    font-size: 0.14rem;
    background: #4fb0f9;

    a{
      text-decoration: none;
      color: #fff;
    }
  }
}

.product {
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  flex: 1;
  overflow-y: scroll;
  background: #fff;
  .product_header {
    display: flex;
    background: #fff;
    height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    font-size: 0.14rem;
    color: #333;
    .product_header_all {
      width: 0.64rem;
      line-height: 0.52rem;
      margin-left: 0.16rem;
      .product_header_icon {
        vertical-align: top;
        color: #0091ff;
        font-size: 0.2rem;
      }
    }
    .product_header_clear {
      flex: 1;
      text-align: right;
      line-height: 0.52rem;
      margin-right: 0.16rem;
    }
  }
  .procuct_item_checked {
    line-height: 0.5rem;
    margin-right: 0.2rem;
    color: #0091ff;
    font-size: 0.2rem;
  }
  .product_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
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
    margin: 0.06rem 0 0 0;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #e93b3b;
  }
  .product_item_yen {
    font-size: 0.12rem;
  }
  .product_item_origin {
    margin-left: 0.06rem;
    line-height: 0.2rem;
    font-size: 0.12rem;
    color: #999;
    text-decoration: line-through;
  }
  .product_item_detail {
    overflow-x: hidden;
  }
  .product_number {
    position: absolute;
    right: 0;
    bottom: 0.12rem;
    .product_number_minus,
    .product_number_plus {
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.17rem;
      display: inline-block;
      border-radius: 50%;
      font-size: 0.2rem;
      text-align: center;
    }
    .product_number_minus {
      border: 0.01rem solid #666;
      color: #666;
      margin-right: 0.05rem;
    }
    .product_number_plus {
      background: #0091ff;
      color: #fff;
      margin-left: 0.05rem;
    }
  }
}
</style>
