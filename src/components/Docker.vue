<template>
  <div class="docker">
    <div v-for="(item,index ) in dockerList"
    :key="item.icon"
    :class="{'docker__item':true, 'docker__item--active':index === currentIndex}"
    >
    <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"/>
      <div class="docke__item_title">{{item.text}}</div>
    </router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe610;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe638;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe713;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe78b;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import "../style/mixin.scss";
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01px solid #f1f1f1;
  color: #333;
  a{
    color: #333;
    text-decoration: none;
  }
}
.docker__item--active {
  a{
    color: #1fa4fc;
  }
  color: #1fa4fc;
}
.docker__item {
  text-align: center;
  flex: 1;
  .docke__item_title {
    font-size: 0.1rem;
  }

  .iconfont {
    margin-top: 0.07rem;
    margin-bottom: 0.02rem;
    font-size: 0.18rem;
  }
}
</style>
