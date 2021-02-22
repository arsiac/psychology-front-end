<!-- login -->
<template>
  <div class="login-surface">
    <!-- 标题 -->
    <header class="login-header">
      <blockquote class="header-title">
        心理学院信息管理系统
      </blockquote>
    </header>

    <!-- 背景板 -->
    <div class="container">
      <div class="particle-background">
        <div id="particle"/>
      </div>
    </div>

    <!-- 尾部 -->
    <footer class="footer">
      &copy;2021-心理学院信息管理系统
    </footer>

    <!-- 表单 -->
    <div class="form-box">
      <fieldset class="form-title">
        <legend>{{ pageStatus ? '用户登录' : '用户注册' }}</legend>
      </fieldset>

      <!-- 表单  -->
      <login-form v-if="pageStatus"/>
      <register-form v-else/>

      <!-- 转换 -->
      <span class="exchange" @click="pageStatus = !pageStatus">{{ pageStatus ? '注册' : '前往登录' }}</span>
    </div>
  </div>
</template>

<script src="./_login.js" lang="js"></script>
<style src="./_login.less" lang="less" scoped></style>
