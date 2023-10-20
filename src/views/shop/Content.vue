<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category_item: true,
          'category_item-active': currentTab === item.tab ? true : false,
        }"
        v-for="item in categories"
        :key="item.tab"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="product">
      <div class="product_item" v-for="item in contentList" :key="item._id">
        <img class="product_item_imgs" :src="item.imgUrl" />
        <div class="product_item_detail">
          <h4 class="product_item_title">{{ item.name }}</h4>
          <p class="product_item_sales">月售 {{ item.sales }} 件</p>
          <p class="product_item_price">
            <span class="product_item_yen">¥</span>{{ item.price }}
            <span class="product_item_origin">¥{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product_number">
          <span class="product_number_minus"
          @click="()=>{changeCartItemInfo(shopId,item._id,item ,-1)}"
          >-</span>
          {{cartList?.[shopId]?.[item._id]?.count || 0}}
          <span
            class="product_number_plus"
            @click="()=>{changeCartItemInfo(shopId,item._id,item ,1)}"
          >+</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useCartListEffect } from './commonCartEffect'

const categories = [
  { label: '全部商品', tab: 'all' },
  { label: '秒杀', tab: 'seckill' },
  { label: '新鲜水果', tab: 'fruit' }
]

// 和tab切换相关的逻辑
const useTabChangeEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    //   getContentData(tab)
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const data = reactive({
    contentList: []
  })

  const getContentData = async () => {
    const result = await get(`/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.error === 0 && result?.data.length > 0) {
      data.contentList = result.data
    }
  }
  watchEffect(() => {
    getContentData()
  })

  const { contentList } = toRefs(data)
  return { contentList }
}

export default {
  name: 'Content',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabChangeEffect()
    const { contentList } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItemInfo } = useCartListEffect()

    return { contentList, currentTab, categories, handleTabClick, cartList, shopId, changeCartItemInfo }
  }
}
</script>
<style scoped lang='scss'>
@import "../../style/mixin.scss";
.content {
  position: absolute;
  display: flex;
  top: 1.5rem;
  bottom: 0.5rem;
  left: 0;
  right: 0;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  background: #f5f5f5;
  .category_item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: #333;
  }
  .category_item-active {
    background: #fff;
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  .product_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    .product_item_imgs {
      width: 0.68rem;
      height: 0.68rem;
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
  .product_item_sales {
    margin: 0.06rem 0;
    color: #333;
    line-height: 0.16rem;
    font-size: 0.12rem;
  }
  .product_item_price {
    margin: 0;
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
