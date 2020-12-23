<template>
  <div class="add-member">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="姓名" input-align="right" :rules="[{ required: true, message: '请填写姓名' }]"/>
      <van-field v-model="phone" type="number" name="phone" label="手机号码" input-align="right" :rules="[{ required: true, validator: phoneValidator, message: '请正确输入手机号码' }]"/>
      <van-field v-model="balance" type="number" name="balance" label="充值" input-align="right" :rules="[{ required: true, validator: balanceValidator, message: '请正确输入充值金额' }]"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import api from '@api/index'
export default {
  name: 'AddMember',
  data() {
    return {
      title: '新增会员',
      name: '',
      phone: '',
      balance: '',
    }
  },
  inject: ['back'],
  created() {
    
  },
  methods: {
    phoneValidator(val) {
      return /^1[0-9]{10}$/.test(val)
    },
    balanceValidator(val) {
      return /^[0-9]+$/.test(val)
    },
    onSubmit(values) {
      const self = this
      const toast = self.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      const params = {
        maccount: self.phone,
        mname: self.name,
        balance: self.balance,
        mtype: 1,
      }
      self.$api.insertMember(params).then(res => {
        if(res.status == 200) {
          if(res.data == 1) {
            self.$dialog.alert({
              message: '新增成功',
              theme: 'round-button',
            }).then(() => {
              self.$router.push({
                path: '/member-center/info/' + self.phone
              })
            })
          } else {
            self.$dialog.alert({
              message: '新增失败，请重试',
              theme: 'round-button',
            })
          }
          toast.close()
        }
      })
      
    },
  },
}
</script>
<style lang="less" scoped>
.add-member{
  
}
</style>