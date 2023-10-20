<template>
     <div class="shop" >
        <img
          :src="item.imgUrl"
          class="shop__img"
        />
        <div :class="{'shop_content':true,'shop_content-bordered':hideBorder?false:true}">
          <div class="shop_content_item">
            <div class="shop_content_title">{{item.name}}</div>
            <div class="shop_content_tags">
              <span class="shop_content_tag">月售 {{item.sales}}</span>
              <span class="shop_content_tag">起送 ¥{{item.expressLimit}}</span>
              <span class="shop_content_tag">基础运费 ¥{{item.expressPrice}}</span>
            </div>
            <span class="shop_hightLight">{{item.slogan}}</span
            >
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
    .shop {
      padding-top: 0.12rem;
      display: flex;

      .shop__img {
        width: 0.56rem;
        height: 0.56rem;
        border-radius: 50%;
      }
      .shop_content_title {
        color: #333;
        font-size: 0.16rem;
        line-height: 0.22rem;
        margin-bottom: 0.08rem;
      }
    }
      .shop_content-bordered{
       border-bottom: 0.01rem solid #f1f1f1;
      }
    .shop_content {
      flex: 1;
      margin-left: 0.16rem;
      padding-bottom: 0.12rem;
      .shop_content_tags {
        margin-bottom: 0.08rem;
        line-height: 0.18rem;
        font-size: 0.13rem;
        display: flex;
        color: #333;
      }
      .shop_content_tag {
        margin-right: 0.16rem;
      }
    }
    .shop_hightLight {
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
</style>
