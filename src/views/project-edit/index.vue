<template>
  <div class="project-edit">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form >
      <van-field v-model="name" label="名称"/>
      <van-field v-model="price" label="单价"/>
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
    }
  },
  created() {
    this.projectId = this.$route.params.projectId
    this.title = this.projectId == 'add' ? '新增项目' : '编辑项目'
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
}
</script>
<style lang="less" scoped>
.user-list{
  
}
</style>