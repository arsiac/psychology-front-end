import particlesJS from '@/utils/particles'
import LoginForm from './form/login-form'
import RegisterForm from './form/register-form'

const particleSetting = {
  particles: {
    number: { value: 100 },
    color: { value: '#fff' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: '#6c7581', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 5, direction: 'none' }
  }
}

export default {
  data () {
    return {
      // 页面状态: login/register(true/false)
      pageStatus: true
    }
  },
  components: {
    LoginForm,
    RegisterForm
  },
  mounted () {
    particlesJS('particle', particleSetting)
  }
}
