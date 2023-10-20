<template>
    <div class="position">
      <span class="iconfont position__icon">&#xe619;</span>
      东北大学九舍科技园2号楼10号
      <span class="iconfont position_bell">&#xecaa;</span>
    </div>
    <div class="search">
      <span class="iconfont search__icon">&#xe741;</span>
      山姆会员优惠商品
    </div>
    <div class="banner">
      <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" />
    </div>
    <div class="icons">
      <div class="icons_icon" v-for="item in iconList" :key="item.text">
        <img :src="item.icons"/>
        <p class="icon_icon_desc">{{item.text}}</p>
      </div>
    </div>
    <div class="gap" />
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      {
        text: '超市便利',
        icons: 'http://www.dell-lee.com/imgs/vue3/超市.png'
      },
      {
        text: '菜市场',
        icons: 'http://www.dell-lee.com/imgs/vue3/菜市场.png'
      },
      {
        text: '水果店',
        icons: 'http://www.dell-lee.com/imgs/vue3/水果店.png'
      },
      {
        text: '鲜花绿植',
        icons: 'http://www.dell-lee.com/imgs/vue3/鲜花.png'
      },
      {
        text: '医药健康',
        icons: 'http://www.dell-lee.com/imgs/vue3/医药健康.png'
      },
      {
        text: '家居时尚',
        icons: 'http://www.dell-lee.com/imgs/vue3/家居.png'
      },
      {
        text: '烘焙蛋糕',
        icons: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png'
      },
      {
        text: '签到',
        icons: 'http://www.dell-lee.com/imgs/vue3/签到.png'
      },
      {
        text: '大牌免运',
        icons: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png'
      },
      {
        text: '红包套餐',
        icons: 'http://www.dell-lee.com/imgs/vue3/红包.png'
      }
    ]
    return { iconList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.wrapper {
  overflow-y:auto ;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem .1rem .18rem;
  .position {
    @include ellipsis;
    color: #333;
    padding: 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    .position__icon {
      position: relative;
      font-size: 0.2rem;
      margin-top: 0.01rem;
    }
    .position_bell {
      float: right;
      font-size: 0.2rem;
    }
  }
  .search {
    vertical-align: middle;
    line-height: 0.32rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    margin-bottom: 0.12rem;

    .search__icon {
      padding-left: 0.1rem;
      display: inline-block;
      font-size: 0.18rem;
    }
  }
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    img {
      width: 100%;
    }
  }
  .icons {
    margin-top: 0.16rem;
    display: flex;
    flex-wrap: wrap;
    .icons_icon {
      width: 20%;
      img {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
      }
      p {
        margin: 0.06rem 0 0.16rem 0;
      }
      .icon_icon_desc {
        text-align: center;
        color: #333;
      }
    }
  }
  .gap {
    margin: 0 -0.18rem;
    height: 0.1rem;
    background-color: #f1f1f1;
  }
}

</style>
