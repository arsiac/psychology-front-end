<template>
  <div>
    <header class="navbar">
      <div class="navbar-container">

        <el-dropdown class="nav-user" @command="handleCommand">
          <button type="button">
            <i class="fa fa-sort-down"></i>
            {{ username }}
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="cp">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" icon="fa fa-sign-out" divided>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <!-- 密码表单 -->
    <el-dialog title="修改密码" :visible="visible" :before-close="handleClose">
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRule">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" placeholder="旧密码" type="password"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" placeholder="新密码" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="passwordForm.confirm" placeholder="重复密码" type="password"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userApi  from '@/api/centre/user'
import loginApi from '@/api/centre/login'

export default {
  data () {
    const confirmPassword = (rule, value, callback) => {
      if (this.passwordForm.newPassword !== value) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }

    return {
      username: 'USER',
      visible: false,
      passwordForm: {
        oldPassword: null,
        newPassword: null,
        confirm: null
      },
      passwordRule: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: confirmPassword, message: '密码不一致', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.username = this.$store.getters.name
  },
  methods: {
    handleCommand (cmd) {
      switch (cmd) {
        case 'cp':
          this.visible = true
          break

        case 'logout':
          loginApi.logout(this.$store.getters.id)
          this.$store.commit('token/updateAccessToken', '')
          this.$router.push({ name: 'login' })
          break

        default:
          break
      }
    },
    handleClose () {
      this.$confirm('信息将不会被保存，确认关闭?', '警告', {
        type: 'warning'
      }).then(() => {
        this.visible      = false
        this.passwordForm = {}
      }).catch(() => {})
    },
    submit () {
      this.$nextTick(() => {
        this.$refs.passwordForm.validate(valid => {
          if (valid) {
            userApi.changePassword({
              userId: this.$store.getters.id,
              oldPassword: this.passwordForm.oldPassword,
              newPassword: this.passwordForm.newPassword
            }).then(({ data }) => {
              if (data.data) {
                this.$notify.success({
                  title: '修改密码',
                  message: '修改成功'
                })
              } else {
                this.$notify.error({
                  title: '修改密码',
                  message: '修改失败'
                })
              }
            }).catch(e => {
              if (!e.response.data.code) {
                this.$notify.error({
                  title: '修改密码',
                  message: '请检查网络'
                })
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style src="./layout.less" lang="less"></style>
