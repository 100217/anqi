<template>
  <div class="member-center-info flex">
    <div class="content flex-item">
      <van-cell class="align-left-all" :border="false" title="姓名" :value="userInfo.name"/>
      <van-cell class="align-left-all" :border="false" title="手机号码" :value="userInfo.phone"/>
      <van-cell class="align-left-all" :border="false" title="余额" :value="userInfo.balance"/>
    </div>
    <div class="footer flex-row">
      <van-button type="info">消费</van-button>
      <van-button type="info">充值</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberCenter',
  data() {
    return {
      userInfo: {
        name: '钱百万',
        phone: '13325767894',
        balance: '500'
      },
    }
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