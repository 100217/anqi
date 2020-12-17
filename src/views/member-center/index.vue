<template>
  <div class="member-center flex">
    <van-tabs class="member-center-tab" v-model="activeTab">
      <van-tab v-for="tab in tabs" :key="tab.value" :title="tab.name"></van-tab>
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
          value: 1
        },{
          name: '消费记录',
          value: 2
        },{
          name: '充值记录',
          value: 3
        }
      ],
    }
  },
}
</script>
