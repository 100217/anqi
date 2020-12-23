<template>
  <div class="member-center-recharge">
    <van-nav-bar title="会员充值" left-arrow @click-left="back" />
  </div>
</template>

<script>
export default {
  name: 'Recharge',
  inject: ['back'],
  data() {
    return {
      user: {},
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
  },
}
</script>
<style lang="less" scoped>
.member-center-recharge{
  
}
</style>