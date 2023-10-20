<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__image"
    />
    <div class="wrapper__input">
      <input
        v-model="userName"
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
      />
    </div>
    <div class="wrapper__input">
      <input
        v-model="password"
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        autocomplete="new-password"
      />
    </div>
      <div class="wrapper__input">
      <input
        v-model="checkPassword"
        type="password"
        class="wrapper__input__content"
        placeholder="确认密码"
      />
    </div>
    <div class="wrapper__register-button"  @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号登录</div>
  </div>
    <Toast v-if="show" :message="toastMessage"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const data = reactive({
    userName: '',
    password: '',
    checkPassword: ''
  })
  const router = useRouter()
  const handleRegister = async () => {
    const { userName, password, checkPassword } = data
    if (data.checkPassword !== data.password || !userName || !password || !checkPassword) {
      showToast('用户名、密码输入错误')
      return
    }
    try {
      const result = await post('/user/register', {
        userName: data.userName,
        password: data.password
      })
      if (result?.error === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch {
      showToast('请求失败')
    }
  }
  const { userName, password, checkPassword } = toRefs(data)
  return { userName, password, checkPassword, handleRegister }
}
export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const { showToast, show, toastMessage } = useToastEffect()
    const { userName, password, checkPassword, handleRegister } = useRegisterEffect(showToast)
    const router = useRouter()
    const handleLoginClick = () => {
      router.push({ name: 'Login' })
    }
    return { userName, password, checkPassword, show, showToast, toastMessage, handleLoginClick, handleRegister }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  .wrapper__image {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  .wrapper__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;

    .wrapper__input__content {
      font-size: 0.16rem;
      width: 100%;
      border: none;
      outline: none;
      line-height: 0.48rem;
      background: none;
      color: rgba(0, 0, 0, 0.85);
      &::placeholder {
        color: #777;
      }
    }
  }

  .wrapper__register-button {
    line-height: 0.48rem;
    font-size: 0.24rem;
    text-align: center;
    margin: 0.32rem 0.4rem 0 0.4rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #fff;
  }

  .wrapper__register-link{
    margin-top: .16rem;
    text-align: center;
    font-size: .14rem;
    color: #777;
  }
}
</style>
