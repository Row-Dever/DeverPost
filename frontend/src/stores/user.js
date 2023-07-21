import { defineStore } from 'pinia'

// 유저 스토어 정의
export const useUserStore = defineStore('user', {
  state: () => ({
    loggedInUser: null, // 로그인한 유저 정보
    accessToken: '', // 액세스 토큰
    refreshToken: '' // 리프레시 토큰
  }),
  actions: {
    // 로그인 성공 시 호출되는 액션
    loginSuccess(user, accessToken, refreshToken) {
      this.loggedInUser = user
      this.accessToken = accessToken
      this.refreshToken = refreshToken

      // 로컬 스토리지에 토큰 저장 (페이지 리로드 시 유지하기 위해)
      // localStorage.setItem('accessToken', accessToken)
      // localStorage.setItem('refreshToken', refreshToken)
    },
    // 로그아웃 시 호출되는 액션
    logout() {
      this.loggedInUser = null
      this.accessToken = ''
      this.refreshToken = ''

      // 로컬 스토리지에서 토큰 삭제
      // localStorage.removeItem('accessToken')
      // localStorage.removeItem('refreshToken')
    },
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage }]
    }
  }
})
