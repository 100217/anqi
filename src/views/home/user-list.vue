<template>
  <div class="user-list flex">
    <van-search v-model="search" placeholder="请输入搜索关键词" />
    <div class="list-box flex-item">
      <!-- <van-cell v-for="user in userList" :key="user.id" :title="'姓名：' + user.name" :value="user.phone"></van-cell> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="align-left" v-for="(user, index) in userList" :key="index" :title="user.mname" :value="user.maccount" @click.stop="viewMember(user)" />
      </van-list>
    </div>
    <div class="footer">
      <van-button block type="primary" @click="addMember">新增会员</van-button>
    </div>
  </div>
</template>

<script>
import api from '@api/index'
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
      start: 0,
      size: 10,
    }
  },
  created() {
    this.start = 0
    this.userList = []
    this.onLoad()
  },
  methods: {
    onLoad() {
      const self = this
      const params = {
        mname: self.search,
        m: self.start,
        n: self.size
      }
      console.log(api)
      api.getMemberList(params).then(res => {
        if(res.status == 200) {
          this.userList = res.data
        }
      })
    },
    addMember() {
      this.$router.push({
        name: 'AddMember'
      })
    },
    viewMember(user) {
      this.$router.push({
        path: '/member-center/info/' + user.mid
      })
    },
  },
}
</script>
<style lang="less" scoped>
.user-list{
  .list-box{
    overflow: hidden auto;
  }
  .footer{
    padding: 10px;
  }
}
</style>
<style lang="less">

</style>