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
    <footer class="login-footer">
      &copy;2021-心理学院信息管理系统
    </footer>

    <!-- 登录 -->
    <div class="login-container">
      <fieldset class="login-field">
        <legend>用户登录</legend>
      </fieldset>
      <div class="login-form-box">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="login-form-item">
              <label>
                <input v-model="loginForm.username" type="text" placeholder="用户名">
                <span class="icon el-icon-user"/>
              </label>
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <div class="login-form-item">
              <label>
                <input v-model="loginForm.password" type="password" placeholder="密码">
                <span class="icon el-icon-lock"/>
              </label>
            </div>
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item prop="code">
            <div class="login-form-item">
              <label style="float: left;">
                <input style="width: 150px;" v-model="loginForm.code" type="text" placeholder="验证码">
                <span class="icon el-icon-coordinate"/>
              </label>
              <div class="captcha-image" v-loading="captchaLoading" @click="loadCaptcha">
                <img :src="captcha" alt="captcha" />
              </div>
            </div>
          </el-form-item>
          <div class="login-form-item">
            <button v-loading="loading" type="button" @click="login">登录</button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="./_login.js" lang="js"></script>
<style src="./_login.less" lang="less" scoped></style>
