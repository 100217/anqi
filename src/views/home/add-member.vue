<template>
  <div class="add-member">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="姓名" input-align="right" :rules="[{ required: true, message: '请填写姓名' }]"/>
      <van-field v-model="phone" type="number" name="phone" label="手机号码" input-align="right" :rules="[{ required: true, validator: phoneValidator, message: '请正确输入手机号码' }]"/>
      <van-field v-model="balance" type="number" name="balance" label="充值" input-align="right" :rules="[{ required: true, validator: balanceValidator, message: '请正确输入充值金额' }]"/>
      <foot-btn :show-ctrol="false" />
    </van-form>
  </div>
</template>

<script>
import api from '@api/index'
import FootBtn from '@/components/foot-btn.vue'
export default {
  components: { FootBtn },
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
            let toast = self.$toast.success('新增成功')
            setTimeout(() => {
              toast.clear()
              self.$router.push({
                path: '/member-center/info/' + self.phone
              })
            }, 1000)
          } else {
            let toast = self.$toast.fail(res.data)
            setTimeout(() => {
              toast.clear()
            }, 1000)
          }
        }
      })
      
    },
  },
}
</script>