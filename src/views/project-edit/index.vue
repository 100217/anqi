<template>
  <div class="project-edit">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="名称" input-align="right"/>
      <van-field v-model="price" type="number" name="price" label="单价" input-align="right"/>
      <van-field readonly clickable name="unit" :value="unit" label="单位" input-align="right" @click="showUnit = true"/>
      <van-popup v-model="showUnit" position="bottom">
        <van-picker show-toolbar :columns="units" @confirm="onConfirm" @cancel="showUnit = false"/>
      </van-popup>
      <foot-btn :show-ctrol="false" />
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FootBtn from '@/components/foot-btn'
export default {
  name: 'ProjectEdit',
  components: { FootBtn },
  data() {
    return {
      title: '',
      name: '',
      price: '',
      unit: null,
      units: ['次', '小时'],
      showUnit: false,
    }
  },
  computed: {
    ...mapGetters(['project'])
  },
  inject: ['back'],
  created() {
    this.projectId = this.$route.params.projectId
    this.title = this.projectId == 'add' ? '新增项目' : '编辑项目'
    if(this.projectId != 'add') {
      this.name = this.project.itemnm
      this.price = this.project.price
      this.unit = this.project.unit != null ? this.units[this.project.unit - 1] : null
    }
  },
  methods: {
    onConfirm(value) {
      this.unit = value
      this.showUnit = false
    },
    onSubmit(values) {
      const self = this
      let params = {
        itemnm: self.name,
        price: self.price,
        unit: self.units.indexOf(self.unit) + 1
      }
      let api = self.$api.insertItem
      let msg = '新增成功'
      if(self.projectId != 'add') {
        params.id = self.projectId
        api = self.$api.updateItem
        msg = '编辑成功'
      }
      api(params).then(res => {
        if(res.status == 200 && res.data == 1) {
          let toast = self.$toast.success(msg)
          setTimeout(() => {
            toast.clear()
            self.$router.push({
              name: 'PriceManage'
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