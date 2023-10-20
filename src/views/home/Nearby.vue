<template>
    <div class="nearby">
      <p class="nearby_big_title">附近店铺</p>
      <router-link
       v-for="item in nearByList"
       :key="item._id"
       :to="`/shop/${item._id}`"
       >
        <ShopInfo :item = "item"/>
       </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearByListEffect = () => {
  const nearByList = ref([])
  const getNearbyList = async () => {
    const result = await get('/shop/hot-list')
    if (result.error === 0 && result?.data?.length > 0) {
      nearByList.value = result.data
    }
  }
  return { nearByList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearByList, getNearbyList } = useNearByListEffect()
    getNearbyList()
    return { nearByList }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.1rem 0.18rem;

  .nearby {
    .nearby_big_title {
      font-weight: 500;
      font-size: 0.18rem;
      color: #333;
      margin-bottom: 0.04rem;
    }
    a{
      text-decoration: none;
    }
  }
}
</style>
