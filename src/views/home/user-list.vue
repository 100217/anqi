<template>
  <div class="user-list flex">
    <van-search v-model="search" placeholder="请输入搜索关键词" @search="searchChange" />
    <div class="list-box flex-item">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="align-left" v-for="(user, index) in userList" :key="index" :title="user.mname" :value="user.maccount" @click.stop="viewMember(user)" />
      </van-list>
    </div>
    <foot-btn :round="false" type="primary" text="新增会员" :form-submit="false" :click-event="addMember" />
  </div>
</template>

<script>
import FootBtn from '@/components/foot-btn.vue'
export default {
  components: { FootBtn },
  name: 'UserList',
  data() {
    return {
      search: '',
      loading: false,
      finished: false,
      userList: [],
      start: 0,
      size: 10,
    }
  },
  created() {
    this.start = 0
    this.userList = []
  },
  methods: {
    onLoad() {
      const self = this
      self.loading = true
      const params = {
        mname: self.search,
        m: self.start,
        n: self.size
      }
      self.$api.getMemberList(params).then(res => {
        if(res.status == 200) {
          if(res.data && res.data.length > 0) {
            self.userList.push(...res.data)
            self.start = self.userList.length
            if(res.data.length < self.size) {
              self.finished = true
            }
          }
          self.loading = false
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
        path: '/member-center/info/' + user.maccount
      })
    },
    searchChange() {
      this.start = 0
      this.userList = []
      this.onLoad()
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