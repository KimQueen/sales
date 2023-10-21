<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="item in list" :key="item.shopId">
        <div class="order_title">
          {{item.shopName}}
          <span class="order_status">{{item.isCancel?'已取消':'已下单'}}</span>
        </div>
        <div class="order_content">
          <div class="order_content_images">
            <template
             v-for="(innerItem,innerIndex) in item.products"
             :key="innerIndex"
            >
            <img
             :src="innerItem.product.imgUrl"
             class="order_content_img"
             v-if="innerIndex <= 3"
            />
            </template>
          </div>
          <div class="order_info">
            <div class="order_info_price">¥ {{item.totalPrice}}</div>
            <div class="order_info_count">共{{item?.total}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/orderList')
    if (result.error === 0 && result?.data?.length > 0) {
      const orderList = result.data
      orderList.forEach(order => {
        const products = order.products || []
        let totalPrice = 0
        let total = 0
        products.forEach((productItem) => {
          totalPrice += +productItem.product.price * +productItem.orderSales
          total += (productItem.orderSales || 0)
        })
        order.totalPrice = totalPrice.toFixed(2)
        order.total = total
      })
      data.list = orderList
    }
  }
  const { list } = toRefs(data)
  getNearbyList()
  return { list }
}
export default {
  name: 'OrderList',
  components: {
    Docker
  },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  background: rgb(248, 248, 248);
}
.title {
  background: #fff;
  height: 0.44rem;
  line-height: 0.44rem;
  color: #333;
  font-size: 0.16rem;
  text-align: center;
}

.orders {
  .order {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background: #fff;
    border-radius: 0.04rem;
    .order_title {
      color: #333;
      font-size: 0.16rem;
      margin-bottom: .16rem;
      .order_status {
        float: right;
        color: #999;
        font-size: 0.14rem;
        line-height: .22rem;
      }
    }
    .order_content{
      display: flex;
      .order_content_images{
        flex: 1;

        .order_content_img{
          width: .4rem;
          height: .4rem;
          margin-right: .12rem;
        }
      }
    }
    .order_info{
      width: .7rem;

      .order_info_price{
        line-height: .2rem;
        font-size: .14rem;
        text-align: right;
        color: #e93b3b;
        margin-bottom: .04rem;
      }
      .order_info_count{
        line-height: .14rem;
        font-size: .12rem;
        text-align: right;
        color: #333;
        margin-bottom: .04rem;
      }
    }
  }
}
</style>
