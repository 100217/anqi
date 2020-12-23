<template>
  <div class="member-center-info flex">
    <div class="content flex-item">
      <van-cell class="align-left-all" :border="false" title="姓名" :value="user.mname"/>
      <van-cell class="align-left-all" :border="false" title="手机号码" :value="user.maccount"/>
      <van-cell class="align-left-all" :border="false" title="余额" :value="user.balance"/>
    </div>
    <div class="footer flex-row">
      <van-button type="info" @click="toExpenses">消费</van-button>
      <van-button type="info" @click="toRecharge">充值</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberCenter',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      
    }
  },
  created() {
    this.maccount = this.$route.params.maccount
  },
  methods: {
    toExpenses() {
      this.$router.push({
        path: '/member-expenses/' + this.maccount
      })
    },
    toRecharge() {
      this.$router.push({
        path: '/member-recharge/' + this.maccount
      })
    },
  },
}
</script>
<style lang="less" scoped>
.member-center-info{
  .content{
    padding: 20px 30px;
  }
  .footer{
    padding: 10px;
    .van-button{
      width: calc(50% - 5px);
      &+.van-button{
        margin-left: 10px;
      }
    }
  }
}
</style>