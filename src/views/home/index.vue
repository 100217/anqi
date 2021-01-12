<template>
  <div class="home flex">
    <van-tabs class="home-tab" v-model="activeTab" @change="changeView">
      <van-tab v-for="(tab, index) in tabs" :key="index" :title="tab.name"></van-tab>
    </van-tabs>
    <router-view  class="home-view flex-item" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          name: '会员列表',
          path: '/home'
        },{
          name: '价目管理',
          path: '/home/price-manage'
        }
      ],
    }
  },
  watch: {
    $route(to, from) {
      this.activeTab = this.tabs.findIndex( o => to.path == o.path )
    },
  },
  created() {
    this.activeTab = this.tabs.findIndex( o => this.$route.path.indexOf(o.path) > -1)
  },
  methods: {
    changeView(index) {
      let path = this.tabs[index].path
      this.$router.push({path})
    },
  },
}
</script>