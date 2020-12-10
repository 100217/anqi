<template>
  <div class="home">
    <van-button type="primary">主要按钮</van-button>
    <img :src="src" />
  </div>
</template>

<script>
import img from '../assets/logo.png'
export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      src: img,
    }
  },
}
</script>
