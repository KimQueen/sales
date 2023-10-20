<template>
  <div class="docker">
    <div v-for="(item,index ) in dockerList"
    :key="item.icon"
    :class="{'docker__item':true, 'docker__item--active':index ===0}"
    >
      <div class="iconfont" v-html="item.icon"/>
      <div class="docke__item_title">{{item.text}}</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe610;', text: '首页' },
      { icon: '&#xe638;', text: '购物车' },
      { icon: '&#xe713;', text: '订单' },
      { icon: '&#xe78b;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
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
}
.docker__item--active {
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
