// Utilities
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import axios from "axios";
export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    //
    userDetail: useLocalStorage("userDetail", {
      accountId: '',
      fio: '',
      userName: '',
      registeredDate: '',
      phoneNumber: '',
      code: '',
      status: ''
    }),
    access: useLocalStorage("auth", {
      acceptToken: '',
      refreshToken: ''
    }),
    // url: 'http://95.169.182.6:8080/api/v1/'
    url: 'http://127.0.0.1:8080/api/v1/'
  }),
  
  actions: {
    setAccess(accessInput) {
      console.log('set access' + accessInput.updateToken)
      this.access = accessInput;

    },
    setUserDetailInfo(userDetailInput) {
      console.log("setUserDetailInfo"+userDetailInput)
      this.userDetail = userDetailInput
    },

    sendRequestAuth(payload) {
      console.log('authUser' + payload.data.password)

      axios.post(this.url + 'auth/authenticate', payload.data)
        .then(response => {
          payload.success(response)
        })
        .catch(err => {
          console.log(err)
          payload.error(err.message)
        }
        )

    },
    sendRequestPost(payload) {
      console.log('send request' + payload)
      console.log('token' + this.acceptToken)
      const headers = {
        Authorization: this.acceptToken
      }
      axios.post(this.url + payload.path, payload.data, { headers })
        .then(response => {
          payload.success(response)
        })
        .catch(err => {
          console.log(err)
          payload.error(err.message)
        }
        )

    },

    sendRequestPut(payload) {
      console.log('send request' + payload)
      console.log('token' + this.acceptToken)
      const headers = {
        Authorization: this.acceptToken
      }
      axios.put(this.url + payload.path, payload.data, { headers })
        .then(response => {
          payload.success(response)
        })
        .catch(err => {
          console.log(err)
          payload.error(err.message)
        }
        )

    },


    sendRequestGet(payload) {
      console.log('send request' + payload)
      const headers = {
        Authorization: this.acceptToken
      }
      axios.get(this.url + payload.path, { headers })
        .then(response => {
          payload.success(response)
        })
        .catch(err => {
          console.log(err)
          payload.error(err.message)
        }
        )

    },


  },
  getters: {
    acceptToken: (state) => state.access.acceptToken,
    userDetailInfo: (state) => state.userDetail,
    refreshToken() {
      return this.access.updateToken
    }
  }
})
