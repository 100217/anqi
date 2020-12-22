<template>
  <div class="member-center-expenses-records flex">
    <van-cell class="align-left" :title="'当前余额：' + user.balance" :value="'共消费' + user.total" />
    <div class="flex-item">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="align-left" v-for="(record, index) in list" :key="index" :title="record.condate" :value="'消费 ' + record.totalcon" />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpensesRecords',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      start: 0,
      size: 10,
    }
  },
  created() {
    this.start = 0
    this.list = []
  },
  methods: {
    onLoad() {
      const self = this
      self.loading = true
      const params = {
        mid: self.user.mid,
        m: self.start,
        n: self.size
      }
      self.$api.getConsumptionList(params).then(res => {
        if(res.status == 200) {
          if(res.data && res.data.length > 0) {
            self.list.push(...res.data)
            self.start = self.list.length
            if(res.data.length < self.size) {
              self.finished = true
            }
          }
          self.loading = false
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.member-center-expenses-records{
  
}
</style>