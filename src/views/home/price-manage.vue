<template>
  <div class="price-manage flex">
    <div class="flex-item">
      <van-swipe-cell v-for="(item, index) in itemList" :key="index" >
        <template #right>
          <van-button square type="warning" icon="edit" @click="editItem(item)" />
          <van-button square type="danger" icon="delete" @click="beforeDeleteItem(item)" />
        </template>
        <van-cell class="align-left" :title="item.itemnm" :value="item.price + '/' + unit(item.unit)"></van-cell>
      </van-swipe-cell>
    </div>
    <div class="footer">
      <van-button block type="primary" @click="addItem">新增项目</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PriceManage',
  components: {
    
  },
  data() {
    return {
      itemList: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['setProject']),
    getList() {
      const self = this
      self.$api.getItemList({}).then(res => {
        if(res.status == 200) {
          self.itemList = res.data
        }
      })
    },
    unit(index) {
      const units = ['次', '小时']
      return units[index - 1]
    },
    addItem() {
      this.$router.push({
        path: '/project-edit/add'
      })
    },
    editItem(item) {
      this.setProject(item)
      this.$router.push({
        path: '/project-edit/' + item.id
      })
    },
    beforeDeleteItem(item) {
      const self = this
      self.$dialog.confirm({
        message: '删除后无法恢复，确认删除？'
      }).then(() => {
        const params = {
          id: item.id
        }
        self.$api.deleteItem(params).then(res => {
          if(res.status == 200 && res.data == 1) {
            self.$dialog.alert({
              message: '删除成功',
              theme: 'round-button',
            }).then(() => {
              self.getList()
            })
          }
        })
      }).catch(() => {
        return false
      })
    },
  },
}
</script>
<style lang="less" scoped>
.price-manage{
  .footer{
    padding: 10px;
  }
}
</style>