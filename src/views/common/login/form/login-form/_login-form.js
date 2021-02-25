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

      // 验证码
      captcha: '',

      // 验证码加载动画
      captchaLoading: false
    }
  },
  mounted () {
    // 加载验证码
    this.loadCaptcha()
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
              // 存储 新的用户信息
              this.updateStore(data.data)
              this.$notify.success({
                title: '提示',
                message: '登陆成功'
              })
              this.$router.push({ name: 'main' })
            } else {
              this.loadCaptcha()
            }
          }).catch(() => {
            this.loading = false
            this.loadCaptcha()
          })
        } else {
          this.$notify.warning({
            title: '警告',
            message: '请完善登录信息'
          })
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
          const imageArray    = new Uint8Array(response.data)
          this.captcha        = `data:image/png;base64,${btoa(imageArray.reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
          // 提取验证码的id
          this.loginForm.uuid = response.headers['captcha-id']
        } else {
          this.$notify.warning({
            title: '警告',
            message: '获取验证码失败, 尝试刷新'
          })
        }
        this.captchaLoading = false
      }).catch(() => {
        this.captchaLoading = false
      })
    },

    // 更新 store 值
    updateStore ({ userId, username, accessToken, expireTime }) {
      this.$store.commit('user/updateId', userId)
      this.$store.commit('user/updateName', username)
      this.$store.commit('token/updateAccessToken', accessToken)
      this.$store.commit('token/updateExpireTime', parseInt(expireTime))
    }
  }
}
