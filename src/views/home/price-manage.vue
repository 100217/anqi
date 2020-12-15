<template>
  <div class="price-manage">
    <van-swipe-cell v-for="(item, index) in itemList" :key="index" >
      <template #right>
        <van-button square type="warning" icon="edit" @click="editItem(item)" />
        <van-button square type="danger" icon="delete" />
      </template>
      <van-cell class="align-left" :title="item.itemnm" :value="item.price + '/' + item.unit"></van-cell>
    </van-swipe-cell>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      loading: false,
      finished: true,
      itemList: [
        {
          itemnm: '按摩',
          price: 80,
          unit: '次',
          id: 1,
        },{
          itemnm: '用药',
          price: 10,
          unit: '次',
          id: 2,
        }
      ],
    }
  },
  methods: {
    onLoad() {},
    editItem(item) {
      this.$router.push({
        path: '/project-edit/' + item.id
      })
    },
  },
}
</script>
<style lang="less" scoped>
.price-manage{

}
</style>