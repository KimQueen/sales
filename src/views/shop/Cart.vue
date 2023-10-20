<template>
  <div class="cart">
    <div class="check">
      <diiv class="check_icon">
        <img
          src="https://www.dell-lee.com/imgs/vue3/basket.png"
          class="icon_img"
        />
        <div class="check_icon_tag">1</div>
      </diiv>
      <div class="check_info">
        总计：<span class="check_info_price">¥ 128</span>
      </div>
      <div class="check_btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart'
}
</script>

<style lang="scss" scoped>
.cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
}
.check {
  display: flex;
  justify-content: space-between;
  .check_icon {
    position: relative;
    width: 0.84rem;
    .check_icon_tag{
        position: absolute;
        width: .2rem;
        height: .2rem;
        background-color:#e93b3b;
        border-radius: 50%;
        font-size: .12rem;
        text-align: center;
        line-height: .2rem;
        color: #fff;
        right: .2rem;
        top: .04rem;
        transform:scale(.5) ;
    }
    .icon_img {
      margin: 0.12rem auto;
      display: block;
      width: 0.28rem;
      height: 0.26rem;
    }
  }
  .check_info{
    flex: 1;
    color: #333;
    line-height: .5rem;
    font-size: .12rem;
    .check_info_price{
        color: #e93b3b;
        font-size: .18rem;
    }
  }
  .check_btn {
    text-align: center;
    width: 0.98rem;
    line-height: 0.5rem;
    color: #fff;
    font-size: 0.14rem;
    background: #4fb0f9;
  }
}
</style>
