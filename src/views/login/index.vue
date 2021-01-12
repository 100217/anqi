<template>
  <div class="login-page">
    <div class="main-page">
      <div class="main-text">
        <div class="text">
          <div>Welcome</div>
          <div>安琪会员中心</div>
        </div>
      </div>
      <div class="main-btn">
        <template v-if="showMain == 0"></template>
        <van-button color="#7232dd" plain block>会员登录</van-button>
        <van-button color="#7232dd" plain block>管理员登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showMain: 0,
    }
  },
  created() {
    
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>
.login-page{
  height: 100%;
  background-image: url(../../assets/bg.jpeg);
  background-size: cover;
  background-position: top;
  &>div{
    height: 100%;
  }
  .main-page{
    .main-text{
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      color: rgba(114, 50, 221, .5);
    }
    .main-btn{
      padding: 0 20px;
      .van-button+.van-button{
        margin-top: 10px;
      }
    }
  }
}
</style>