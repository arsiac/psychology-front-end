<template>
  <nav class="sidebar">
    <!-- logo -->
    <div class="header">
      <div class="logo-container">
        <a href="/">心理学院</a>
      </div>
    </div>

    <!-- menu -->
    <div class="content">
      <ul class="menu" :key="i" v-for="(item, i) in menu">
        <li>{{ item.name }}</li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      menu: [{ name: 'aaa' }]
    }
  }
}
</script>

<style src="./layout.less" lang="less"></style>
