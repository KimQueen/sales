<template>
<div class="wrapper">
  <div class="search">
    <div
    class="search_back iconfont"
    @click="handleBackClick"
    >
      &#xe7eb;
    </div>
    <div class="search_content">
      <span class="search_icon iconfont">&#xe741;</span>
      <input
      class="search_input"
      placeholder="请输入商品名称"
      />
    </div>
  </div>
    <ShopInfo :item ="item" hideBorder="true" v-if="item.imgUrl"/>
    <Content/>
    <Cart/>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 获取当前商家信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })

  const getItemData = async () => {
    const result = await get(`/shop/${route.params.id}`)
    if (result.error === 0) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 返回上一步
const useBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { handleBackClick } = useBackEffect()
    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 .18rem;
}
.search{
  height: .32rem;
  margin: .14rem 0 .04rem 0;
 display: flex;
 .search_back{
  width: .3rem;
  line-height: .32rem;
  font-size: .24rem;
  color:#b6b6b6
 }
 .search_content{
  display: flex;
  flex: 1;
  line-height: .32rem;
  background: #f5f5f5;
  border-radius: .16rem;
  .search_icon{
    width: .44rem;
    text-align: center;
    color:#b7b7b7
  }
  .search_input{
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    padding-right: .2rem;
    color: #333;
    font-size: .14rem;
    &::placeholder{
      color: #333;
    }
  }
 }
}
</style>
