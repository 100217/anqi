<template>
  <div class="member-center-expenses flex">
    <van-nav-bar title="会员消费" left-arrow @click-left="back" />
    <div class="content flex-item">
      <div class="user-info">
        <!-- <div>姓名：{{ user.mname }}</div>
        <div>电话：{{ user.maccount }}</div>
        <div>余额：{{ user.balance }}</div> -->
        <van-cell class="align-left-all" :border="false" title="姓名" :value="user.mname"/>
        <van-cell class="align-left-all" :border="false" title="手机号码" :value="user.maccount"/>
        <van-cell class="align-left-all" :border="false" title="余额" :value="user.balance"/>
        <van-field class="input-align-right" v-model="expenses" label="本次消费" />
        
      </div>
      <div class="user-expenses-total flex-item">
        <van-divider />
        <div class="user-expenses-item flex flex-row" v-for="(item, index) in itemList" :key="index">
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
     <div style="margin: 16px;">
        <van-button round block type="info">提交</van-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Expenses',
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
  },
}
</script>
<style lang="less" scoped>
.member-center-expenses{
  .user-info{
    
  }
  .user-expenses-total{
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