import loginApi from '@/api/centre/login'

export default {
  data () {
    return {
      // 注册按钮
      loading: false,

      // 注册表单
      registerForm: {
        username: null,
        code: null,
        password: null,
        confirm: null
      },

      // 表单验证
      registerRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '教师编码不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      }
    }
  },

  methods: {
    /**
     * 注册
     * */
    register () {
      this.refs.registerForm.validate(valid => {
        if (valid) {
          loginApi.register(this.registerForm).then(response => {
            if (response.status === 200) {
              if (response.data) {
                this.$message.success('注册成功')
              } else {
                this.$message.error('注册失败')
              }
            }
          }).catch(error => {
            this.$message.error(error.response.data.message ? error.response.data.message : error.message)
          })
        }
      })
    }
  }
}
