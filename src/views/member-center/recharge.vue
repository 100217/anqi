<template>
  <div class="member-center-recharge">
    <van-nav-bar title="会员充值" left-arrow @click-left="back" />
    <div class="content">
      <div class="user-info">
        <van-cell class="align-left-all" :border="false" title="姓名" :value="user.mname"/>
        <van-cell class="align-left-all" :border="false" title="手机号码" :value="user.maccount"/>
        <van-cell class="align-left-all" :border="false" title="余额" :value="user.balance"/>
        <van-field class="input-align-right" type="number" v-model="recharge" label="本次充值" />
      </div>
    </div>
    <foot-btn :show-ctrol="false" :form-submit="false" :click-event="submit" />
  </div>
</template>

<script>
import FootBtn from '@/components/foot-btn.vue'
export default {
  components: { FootBtn },
  name: 'Recharge',
  inject: ['back'],
  data() {
    return {
      user: {},
      recharge: '',
    }
  },
  created() {
    this.maccount = this.$route.params.maccount
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const self = this
      const {maccount} = self
      const params = {
        maccount
      }
      self.$api.getMember(params).then(res => {
        if(res.status == 200) {
          self.user = res.data
        }
      })
    },
    submit() {
      const self = this
      if(self.recharge <= 0) {
        self.$dialog.alert({
          message: '请确认充值金额后再提交'
        })
        return
      }
      const params = {
        mid: self.user.mid,
        totalrech: self.recharge
      }
      self.$api.insertRecharge(params).then(res => {
        if(res.status == 200 && res.data == 1) {
          let toast = self.$toast.success('充值成功')
          setTimeout(() => {
            toast.clear()
            self.$router.push({
              name: 'RechargeRecords',
              params: {
                maccount: self.maccount
              }
            })
          }, 1000)
        } else {
          let toast = self.$toast.fail(res.data)
          setTimeout(() => {
            toast.clear()
          }, 1000)
        }
      })
    },
  },
}
</script>