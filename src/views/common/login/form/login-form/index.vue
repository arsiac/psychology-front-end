<template>
   <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="form"
   >
    <!-- 用户名 -->
    <el-form-item prop="username">
      <div class="form-item">
        <label>
          <input v-model="loginForm.username" type="text" placeholder="用户名">
          <span class="icon el-icon-user"/>
        </label>
      </div>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <div class="form-item">
        <label>
          <input v-model="loginForm.password" type="password" placeholder="密码">
          <span class="icon el-icon-lock"/>
        </label>
      </div>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="code">
      <div class="form-item">
        <label style="float: left;">
          <input style="width: 150px;" v-model="loginForm.code" type="text" placeholder="验证码">
          <span class="icon el-icon-coordinate"/>
        </label>
        <div class="captcha" v-loading="captchaLoading" @click="loadCaptcha">
          <img :src="captcha" alt="captcha" />
        </div>
      </div>
    </el-form-item>
    <div class="form-item">
      <button v-loading="loading" type="button" @click="login">登录</button>
    </div>
  </el-form>
</template>

<script src="./_login-form.js" lang="js"></script>
<style src="./_login-form.less" lang="less" scoped></style>
