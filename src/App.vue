<template>
  <div id="app">
    <nav>安琪会员中心</nav>
    <router-view/>
  </div>
</template>

<style lang="less">
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
  height: 2rem;
  line-height: 2;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
