<template>
  <div class="member-center flex">
    <van-tabs class="member-center-tab" v-model="activeTab" @change="changeView">
      <van-tab v-for="(tab, index) in tabs" :key="index" :title="tab.name"></van-tab>
    </van-tabs>
    <router-view class="flex-item"/>
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
  created() {
    this.userId = this.$route.params.userId
    this.activeTab = this.tabs.findIndex( o => this.$route.path.indexOf(o.path) > -1)
  },
  methods:{
    changeView(index) {
      let {userId} = this
      let path = this.tabs[index].path + userId
      this.$router.push({path})
    },
  }
}
</script>
