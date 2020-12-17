<template>
  <div class="add-member">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="姓名" input-align="right"/>
      <van-field v-model="phone" type="number" name="phone" label="手机号码" input-align="right"/>
      <van-field v-model="balance" type="number" name="balance" label="充值" input-align="right"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

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
    onSubmit(values) {
      this.$router.push({
        name: 'Home'
      })
    },
  },
}
</script>
<style lang="less" scoped>
.add-member{
  
}
</style>