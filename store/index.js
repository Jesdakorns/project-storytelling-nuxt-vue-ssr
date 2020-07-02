import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadData: ''
    },
    mutations: {
      setStorys (state, post) {
        state.loadData = post
      },
      setCookies (state, post) {
        state.cookies = post
      }
    },
    actions: {
      async setStorys (context) {
        await axios.get('/api/user',
          {
            headers: {
              Authorization: `${this.$cookies.get('_Key')}`
            }
          }).then((res) => {
          const result = res.data.data
          context.commit('setStorys', result)
        }).catch((err) => {
          context.error(err)
        })
      }
    },
    getters: {
      getId (state) {
        return state.loadData.id
      },
      getName (state) {
        return state.loadData.name
      },
      getEmail (state) {
        return state.loadData.email
      },
      getPhone (state) {
        return state.loadData.phone
      },
      getImage (state) {
        return state.loadData.image
      }
    }
  })
}

export default createStore
