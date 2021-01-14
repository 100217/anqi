<template>
  <div class="member-center-recharge-records flex">
    <van-cell class="align-left" :title="'当前余额：' + customer.balance" :value="'共充值' + total" />
    <div class="flex-item">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell class="align-left" v-for="(record, index) in list" :key="index" :title="record.rechdate" :value="'充值 ' + record.totalrech" />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RechargeRecords',
  props: {
    customer: {
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
      total: 0,
    }
  },
  created() {
    this.start = 0
    this.list = []
    this.getRecharge()
  },
  methods: {
    getRecharge() {
      const self = this
      const params = {
        mid: self.customer.mid
      }
      self.$api.getRechargeTotal(params).then(res => {
        if(res.status == 200) {
          self.total = res.data || 0
        }
      })
    },
    onLoad() {
      const self = this
      self.loading = true
      const params = {
        mid: self.customer.mid,
        m: self.start,
        n: self.size
      }
      self.$api.getRechargeList(params).then(res => {
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