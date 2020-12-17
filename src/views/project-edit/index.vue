<template>
  <div class="project-edit">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="名称" input-align="right"/>
      <van-field v-model="price" type="number" name="price" label="单价" input-align="right"/>
      <van-field readonly clickable name="unit" :value="unit" label="单位" input-align="right" @click="showUnit = true"/>
      <van-popup v-model="showUnit" position="bottom">
        <van-picker show-toolbar :columns="units" @confirm="onConfirm" @cancel="showUnit = false"/>
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

export default {
  name: 'ProjectEdit',
  data() {
    return {
      title: '',
      name: '',
      price: '',
      unit: null,
      units: ['次', '小时'],
      showUnit: false,
    }
  },
  inject: ['back'],
  created() {
    this.projectId = this.$route.params.projectId
    this.title = this.projectId == 'add' ? '新增项目' : '编辑项目'
  },
  methods: {
    onConfirm(value) {
      this.unit = value
      this.showUnit = false
    },
    onSubmit(values) {
      console.log(this.name, this.price, this.unit, values)
    },
  },
}
</script>
<style lang="less" scoped>
.user-list{
  
}
</style>