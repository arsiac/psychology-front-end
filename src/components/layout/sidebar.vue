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
      <ul class="group">
        <li>
          <ul class="menu">
            <li :class="active === 'home' ? 'select' : ''" @click="menuClick('home')">
              <i class="fa fa-dashboard"></i>
              首页
            </li>
          </ul>
        </li>
        <li class="group-title" :key="i" v-for="(item, i) in menu">
          {{ item.name }}
          <ul class="menu">
            <li :class="active === subItem.name ? 'select' : ''" :key="i" v-for="(subItem, i) in item.children" @click="menuClick(subItem.name)">
              <i :class="'fa ' + subItem.icon"></i>
              {{ subItem.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      menu: [],
      active: ''
    }
  },
  mounted () {
    this.active = sessionStorage.getItem('menuActive') || 'home'
    this.menu = JSON.parse(sessionStorage.getItem('menu'))
  },
  methods: {
    menuClick (to) {
      // 如果已经被选择则不路由,避免报错
      if (this.active !== to) {
        this.active = to
        sessionStorage.setItem('menuActive', to)
        this.$router.push({ name: to })
      }
    }
  }
}
</script>

<style src="./layout.less" lang="less"></style>
