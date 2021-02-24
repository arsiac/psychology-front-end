<template>
  <el-form
      ref="loginForm"
      :model="registerForm"
      :rules="registerRules"
      class="form"
  >
    <!-- 用户名 -->
    <el-form-item prop="username">
      <div class="form-item">
        <label>
          <input v-model="registerForm.username" type="text" placeholder="用户名">
          <span class="icon el-icon-user"/>
        </label>
      </div>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <div class="form-item">
        <label>
          <input v-model="registerForm.password" type="password" placeholder="密码">
          <span class="icon el-icon-lock"/>
        </label>
      </div>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="code">
      <div class="form-item">
        <label>
          <input v-model="registerForm.code" type="text" placeholder="教师编码">
          <span class="icon el-icon-s-custom"/>
        </label>
      </div>
    </el-form-item>
    <div class="form-item">
      <button v-loading="loading" type="button" @click="register">
        <span class="fa fa-smile-o"></span>
        注册
      </button>
    </div>
  </el-form>
</template>

<script src="./_register-form.js" lang="js"></script>
<style src="./_register-form.less" lang="less" scoped></style>
