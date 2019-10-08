import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const Store = () => {
  return new Vuex.Store({
    state: {
      currentUser: {},
      organizations: []
    },
    mutations: {
      ...vuexfireMutations,
      setCurrentUser(state, user) {
        state.currentUser = user
      },
    },
    actions: {
      setOrganizationsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('organizations', ref)
      })
    },
    getters: {
      getCurrentUser: (state) => {
        return state.currentUser
      },
      getOrganizations: (state) => {
        return state.organizations
      },
    },
  })
}

export default Store
