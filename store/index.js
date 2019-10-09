import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
    currentUser: {},
    organizations: []
})

export const mutations = {
    ...vuexfireMutations,
    setCurrentUser(state, user) {
        state.currentUser = user
    }
}

export const actions = {
    setOrganizationsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('organizations', ref)
    })
}

export const getters = {
    getCurrentUser: (state) => {
        return state.currentUser
    },
    getOrganizations: (state) => {
        return state.organizations
    }
}
