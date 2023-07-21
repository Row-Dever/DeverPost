import { defineStore } from 'pinia'

// 유저 스토어 정의
export const useUserStore = defineStore('user', {
  state: () => ({
    loggedInUser: null, // 로그인한 유저 정보
    accessToken: '', // 액세스 토큰
    refreshToken: '' // 리프레시 토큰
  }),
  actions: {
    loginSuccess(user, accessToken, refreshToken) {
      console.log('login')
      this.loggedInUser = user
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    logout() {
      this.loggedInUser = null
      this.accessToken = ''
      this.refreshToken = ''
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})
