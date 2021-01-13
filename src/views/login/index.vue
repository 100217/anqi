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
        <template v-if="showMain == 0">
          <van-button color="#7232dd" plain block @click="toUser">会员登录</van-button>
          <van-button color="#7232dd" plain block @click="toOwner">管理员登录</van-button>
        </template>
        <template v-else-if="showMain == 1">
          <van-field v-model="account" name="手机号码" label="手机号码" placeholder="手机号码" />
          <div style="margin: 16px 0;">
            <van-button round block  color="#7232dd" @click="userLogin">登录</van-button>
            <div class="back-nav">
              <div class="left" @click="toMain">
                <van-icon name="arrow-left" />
                <span>返回</span>
              </div>
              <div class="right" @click="toOwner">
                <span>管理员登录</span>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <van-field v-model="username" name="管理员账号" label="管理员账号" placeholder="管理员账号" />
          <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
          <div style="margin: 16px 0;">
            <van-button round block  color="#7232dd" @click="ownerLogin">登录</van-button>
            <div class="back-nav">
              <div class="left" @click="toMain">
                <van-icon name="arrow-left" />
                <span>返回</span>
              </div>
              <div class="right" @click="toUser">
                <span>会员登录</span>
              </div>
            </div>
          </div>
        </template>
      </div>   
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      showMain: 0,
      username: null,
      password: null,
      account: null,
    }
  },
  created() {
    
  },
  methods:{
    ...mapActions(['setUser']),
    toUser() {
      this.resetParams()
      this.showMain = 1
    },
    toOwner() {
      this.resetParams()
      this.showMain = 2
    },
    toMain() {
      this.resetParams()
      this.showMain = 0
    },
    resetParams() {
      this.username = null
      this.password = null
      this.account = null
    },
    ownerLogin() {
      const self = this
      if(self.username == null || self.username == '') {
        self.$toast.fail('请输入管理员账号')
        return
      }
      if(self.password == null || self.password == '') {
        self.$toast.fail('请输入密码')
        return
      }
      const params = {
        maccount: self.username,
        password: self.password
      }
      self.$api.mglogin(params).then(res => {
        if(res.status == 200) {
          if(res.data.msg) {
            self.$dialog.alert({
              message: res.data.msg,
            })
            return
          }
          self.setUser(res.data)
          self.$router.push({
            name: 'Home'
          })
          
        }
      })
    },
    userLogin() {
      const self = this
      if(self.account == null || self.account == '') {
        self.$toast.fail('请输入会员手机号码')
        return
      }
      const params = {
        maccount: self.account
      }
      self.$api.getMember(params).then(res => {
        if(res.status == 200) {
          if(res.data == '' || res.data.msg) {
            let msg = res.data == '' ? '手机号码不存在' : res.data.msg
            self.$dialog.alert({
              message: msg,
            })
            return
          }
          self.setUser(res.data)
          self.$router.push({
            name: 'MemberInfo',
            params: {
              maccount: res.data.maccount
            }
          })
        }
      })
    },
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
      .back-nav{
        height: 46px;
        line-height: 46px;
        font-size: 14px;
        color: rgba(114, 50, 221, 1);
        position: relative;
        &>div{
          position: absolute;
          top: 0;
          bottom: 0;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          cursor: pointer;
        }
        .left{
          left: 0;
          
        }
        .right{
          right: 0;
        }
      }
    }
  }
}
</style>