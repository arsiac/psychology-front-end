import loginApi from '@/api/centre/login'

export default {
  data () {
    return {
      loading: false,
      loginForm: {
        username: 'admin',
        password: '123456',
        code: null,
        uuid: null
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      captcha: '',
      captchaLoading: false
    }
  },
  methods: {
    /**
     * 登录
     */
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          loginApi.login(this.loginForm).then(({ data }) => {
            this.loading = false
            if (data.code === 200) {
              this.$message.success('登陆成功')

              // 存储 token
              // this.$store.commit('updateAccessToken')
              this.$router.push({ name: 'home' })
            } else {
              this.loadCaptcha()
            }
          }).catch(() => {
            this.loading = false
            this.loadCaptcha()
          })
        } else {
          this.$message.warning('请完善登录信息')
        }
      })
    },

    /**
     * 加载验证码
     * */
    loadCaptcha () {
      this.captchaLoading = true
      loginApi.captcha().then(response => {
        if (response.status === 200) {
          // 显示图片
          const imageArray = new Uint8Array(response.data)
          this.captcha = `data:image/png;base64,${btoa(imageArray.reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
          // 提取验证码的id
          this.loginForm.uuid = response.headers['captcha-id']
        } else {
          this.$message.warning('获取验证码失败')
        }
        this.captchaLoading = false
      }).catch(() => {
        this.captchaLoading = false
      })
    }
  }
}
