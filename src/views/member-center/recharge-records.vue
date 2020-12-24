<template>
  <div class="member-center-recharge-records flex">
    <van-cell class="align-left" :title="'当前余额：' + user.balance" :value="'共充值' + user.total" />
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