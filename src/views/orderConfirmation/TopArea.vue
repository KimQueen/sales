<template>
 <div class="top">
      <div class="top_header">
        <div class="top_header_back iconfont" @click="handleBackClick">
          &#xe7eb;
        </div>
        确认订单
      </div>
      <div class="top_receiver">
        <div class="top_receiver_title">收货地址</div>
        <div class="top_receiver_address">东北大学九舍科技园2号楼10号</div>
        <div class="top_receiver_info">
          <span class="top_receiver_name">零零七（先生）</span>
          <span class="top_receiver_name">13912345678</span>
        </div>
        <div class="iconfont top_receiver_icon">&#xe7ec;</div>
      </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/mixin.scss";
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  .top_header {
    position: relative;
    padding-top: 0.26rem;
    color: #fff;
    line-height: 0.24rem;
    text-align: center;
    font-size: 0.16rem;
    .top_header_back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  .top_receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    .top_receiver_title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      color: #333;
      font-size: 0.16rem;
      line-height: 0.22rem;
      font-weight: 500;
    }
    .top_receiver_address {
      padding: 0 0.4rem 0 0.16rem;
      color: #333;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
    .top_receiver_info {
      padding: 0.06rem 0 0 0.16rem;
      color: #666;
      font-size: 0.12rem;
      line-height: 0.18rem;
      .top_receiver_name {
        margin-right: 0.06rem;
      }
    }
    .top_receiver_icon {
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      font-size: 0.2rem;
      color: #666;
    }
  }
}

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
  // .products_list {
  //   flex: 1;
  //   overflow-y: scroll;
  // }
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
