<template>
  <div id="app" class="flex">
    <nav>安琪会员中心</nav>
    <router-view class="flex-item"/>
  </div>
</template>

<style lang="less">
html, body{
  padding: 0;
  margin: 0;
  height: 100vh;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
nav{
  height: 4rem;
  line-height: 4;
  text-align: left;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
}
.flex{
  display: flex;
  flex-direction: column;
}
.flex-row{
  flex-direction: row;
}
.flex-item{
  flex: 1;
  min-width: 0;
  min-height: 0;
}
</style>
