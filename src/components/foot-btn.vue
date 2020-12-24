<template>
  <div class="foot-btn">
    <van-button v-show="showBtn" v-if="!formSubmit" :round="round" block :type="type" @click="clickEvent">{{text}}</van-button>
    <van-button v-show="showBtn" v-else :round="round" block :type="type" native-type="submit">{{text}}</van-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    text: {
      type: String,
      default: '提交'
    },
    clickEvent: {
      type: Function,
    },
    formSubmit: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'info'
    },
    showCtrol: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return{
      showBtn: true,
      showHeight: document.documentElement.clientHeight,
      domHeight: document.documentElement.clientHeight,
    }
  },
  watch: {
    showHeight() {
      this.showBtn = this.showCtrol ? this.domHeight <= this.showHeight : true
    },
  },
  created() {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight
      })()
    }
  },
}
</script>
<style lang="less" scoped>
.foot-btn{
  padding: 10px;
}
</style>