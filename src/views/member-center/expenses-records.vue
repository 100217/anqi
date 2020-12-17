<template>
  <div class="member-center-expenses-records flex">
    <van-cell class="align-left" :title="'当前余额：' + balance" :value="'共消费' + total" />
    <div class="flex-item">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="align-left" v-for="(record, index) in list" :key="index" :title="record.date" :value="'消费 ' + record.total" />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpensesRecords',
  data() {
    return {
      loading: false,
      finished: true,
      balance: 1500,
      total: 750,
      list: [
        {
          date: '2020/11/8',
          total: 120
        },{
          date: '2020/12/8',
          total: 180
        }
      ],
    }
  },
  methods: {
    onLoad() {},
  },
}
</script>
<style lang="less" scoped>
.member-center-expenses-records{
  
}
</style>