<template>
  <div class="home flex">
    <van-tabs class="home-tab" v-model="activeTab">
      <van-tab v-for="tab in tabs" :key="tab.value" :title="tab.name"></van-tab>
    </van-tabs>
    <component class="home-view flex-item" :is="components[activeTab]"></component>
  </div>
</template>

<script>
import useList from './user-list'
import priceManage from './price-manage'
export default {
  name: 'Home',
  components: {
    useList, priceManage
  },
  data() {
    return {
      components: ['useList', 'priceManage'],
      activeTab: 0,
      tabs: [
        {
          name: '会员列表',
          value: 1
        },{
          name: '价目管理',
          value: 2
        }
      ],
    }
  },
}
</script>
