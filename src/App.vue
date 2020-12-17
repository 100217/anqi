<template>
  <div id="app" class="flex">
    <van-nav-bar v-if="showNav" title="安琪会员中心" />
    <router-view class="flex-item"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNav: true
    }
  },
  provide () {
    return {
      back: this.back
    }
  },
  created() {
    this.showNavNames = ['Home']
  },
  watch: {
    $route(to) {
      let { name } = to
      this.showNav = this.showNavNames.indexOf(name) > -1
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less">
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
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
}
</style>
