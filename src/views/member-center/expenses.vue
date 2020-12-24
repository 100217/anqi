<template>
  <div class="member-center-expenses flex">
    <van-nav-bar title="会员消费" left-arrow @click-left="back" />
    <div class="content flex-item flex">
      <div class="user-info">
        <van-cell class="align-left-all" :border="false" title="姓名" :value="user.mname"/>
        <van-cell class="align-left-all" :border="false" title="手机号码" :value="user.maccount"/>
        <van-cell class="align-left-all" :border="false" title="余额" :value="user.balance"/>
        <van-field class="input-align-right" type="number" v-model="expenses" label="本次消费" />
        
      </div>
      <div class="user-expenses-total flex-item">
        <van-divider />
        <div class="user-expenses-item flex-item flex flex-row" v-for="(item, index) in itemList" :key="index">
          <div class="title flex-item">
            {{`${item.itemnm}  ${item.price} / ${getUnit(item.unit)}`}}
          </div>
          <div class="calc flex-item">
            <van-button icon="minus" size="mini" @click="minus(item)"/>
            <input class="item-num" v-model="item.num" type="number" />
            <van-button icon="plus" size="mini" @click="plus(item)"/>
          </div>
        </div>
      </div>
    </div>
    <foot-btn :form-submit="false" :click-event="submit" />
  </div>
</template>

<script>
import FootBtn from '@/components/foot-btn'
export default {
  name: 'Expenses',
  components: { FootBtn },
  inject: ['back'],
  data() {
    return {
      user: {},
      itemList: [],
      expenses: '0',
    }
  },
  created() {
    this.maccount = this.$route.params.maccount
    this.getUserInfo()
    this.getList()
  },
  methods: {
    getList() {
      const self = this
      self.$api.getItemList({}).then(res => {
        if(res.status == 200) {
          self.itemList = res.data
          self.itemList.forEach(item => {
            item.num = 0
          })
        }
      })
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
    getUnit(index) {
      const units = ['次', '小时']
      return units[index - 1]
    },
    calcTotal() {
      const self = this
      let total = 0
      self.itemList.forEach(item => {
        total += item.price * item.num
      })
      self.expenses = total
    },
    plus(item) {
      let index = this.itemList.indexOf(item)
      if(item.unit == 1) {
        item.num ++
      } else {
        item.num += 0.5
      }
      this.itemList.splice(index, 1, item)
      this.calcTotal()
    },
    minus(item) {
      let index = this.itemList.indexOf(item)
      if(item.num <= 0) {
        item.num = 0
      } else {
        if(item.unit == 1) {
          item.num --
        } else {
          item.num -= 0.5
        }
      }
      this.itemList.splice(index, 1, item)
      this.calcTotal()
    },
    submit() {
      const self = this
      if(self.expenses <= 0) {
        self.$dialog.alert({
          message: '请确认消费金额后再提交'
        })
        return
      }
      let discon = ''
      self.itemList.forEach(item => {
        if(item.num > 0) {
          discon += `${item.itemnm}${item.num}${self.getUnit(item.unit)},`
        }
      })
      discon = discon.slice(0,-1)
      const params = {
        mid: self.user.mid,
        totalcon: self.expenses,
        discon: discon
      }
      self.$api.insertConsumption(params).then(res => {
        if(res.status == 200 && res.data == 1) {
          let toast = self.$toast.success('提交消费成功')
          setTimeout(() => {
            toast.clear()
            self.$router.push({
              name: 'ExpensesRecords',
              params: {
                maccount: self.maccount
              }
            })
          }, 1000)
        } else {
          let toast = self.$toast.fail(res.data)
          setTimeout(() => {
            toast.clear()
          }, 1000)
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.member-center-expenses{
  .user-expenses-total{
    overflow: hidden auto;
    .van-divider{
      margin-top: 0;
    }
    .user-expenses-item{
      font-size: 14px;
      padding: 10px 16px;
      line-height: 24px;
      .title{
        text-align: left;
        color: #323233;
      }
      .calc{
        text-align: right;
        .van-button{
          vertical-align: middle;
          margin: 0 10px;
        }
        .item-num{
          width: 32px;
          outline: none;
          height: 18px;
          vertical-align: middle;
          border: 1px solid #ebedf0;
          text-align: center;
          font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
        }
      }
    }
  }
}
</style>