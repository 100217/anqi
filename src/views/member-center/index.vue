<template>
  <div class="member-center flex">
    <van-tabs class="member-center-tab" v-model="activeTab" @change="changeView">
      <van-tab v-for="(tab, index) in tabs" :key="index" :title="tab.name"></van-tab>
    </van-tabs>
    <router-view class="flex-item" :user="user"/>
  </div>
</template>

<script>
export default {
  name: 'MemberCenter',
  components: {
    
  },
  data() {
    return {
      activeTab: 0,
      user: {},
      tabs: [
        {
          name: '会员信息',
          path: '/member-center/info/'
        },{
          name: '消费记录',
          path: '/member-center/expenses-records/'
        },{
          name: '充值记录',
          path: '/member-center/recharge-records/'
        }
      ],
    }
  },
  watch: {
    $route(to, from) {
      this.activeTab = this.tabs.findIndex( o => to.path.indexOf(o.path) > -1)
    },
  },
  created() {
    this.maccount = this.$route.params.maccount
    this.getUserInfo()
  },
  methods:{
    changeView(index) {
      let {maccount} = this
      let path = this.tabs[index].path + maccount
      this.$router.push({path})
    },
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
  }
}
</script>
