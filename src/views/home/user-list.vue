<template>
  <div class="user-list flex">
    <van-search v-model="search" placeholder="请输入搜索关键词" />
    <div class="list-box flex-item">
      <!-- <van-cell v-for="user in userList" :key="user.id" :title="'姓名：' + user.name" :value="user.phone"></van-cell> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(user, index) in showList" :key="index" :title="user.name" :value="user.phone"></van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserList',
  data() {
    return {
      search: '',
      loading: false,
      finished: true,
      userList: [
        {
          id: 1,
          name: '赵匡胤',
          phone: '13312348877'
        },{
          id: 2,
          name: '钱百万',
          phone: '18900001233'
        }
      ],
    }
  },
  computed: {
    showList() {
      return this.search == '' ? [...this.userList] :this.userList.filter(o => o.name.indexOf(this.search) > -1)
    },
  },
  methods: {
    onLoad() {},
  },
}
</script>
<style lang="less" scoped>
.user-list{
  .list-box{
    overflow: hidden auto;
  }
}
</style>
<style lang="less">
.user-list{
  .van-cell__title{
    text-align: left;
  }
}
</style>