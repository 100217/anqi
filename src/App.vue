<template>
  <div id="app" class="flex">
    <template v-if="showNav">
      <van-nav-bar :left-arrow="requireBack" title="安琪会员中心" @click-left="backHome"></van-nav-bar>
    </template>
    <router-view class="flex-item"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNav: true,
      requireBack: false,
    }
  },
  provide () {
    return {
      back: this.back
    }
  },
  created() {
    this.showNavNames = ['Home', 'PriceManage', 'MemberInfo', 'ExpensesRecords', 'RechargeRecords',]
    this.showBackNames = ['MemberInfo', 'ExpensesRecords', 'RechargeRecords',]
  },
  watch: {
    $route(to) {
      let { name } = to
      this.showNav = this.showNavNames.indexOf(name) > -1
      this.requireBack = this.showBackNames.indexOf(name) > -1
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    backHome() {
      this.$router.push({
        name: 'Home'
      })
    },
  },
}
</script>
<style lang="less">
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
  min-height: 80vh;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.flex{
  display: flex;
  flex-direction: column;
}
.flex-row{
  flex-direction: row;
}
.flex-item{
  flex: 1;
  min-width: 0;
  min-height: 0;
}
.van-cell{
  &.align-left{
    .van-cell__title{
      text-align: left;
    }
  }
  &.align-left-all{
    .van-cell__title{
      text-align: left;
    }
    .van-cell__value{
      text-align: left;
    }
  }
  &.van-field.input-align-right{
    .van-cell__value{
      .van-field__control{
        text-align: right;
      }
    }
  }
}
</style>
