import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const strict = false

export const state = () => ({
    currentUser: {},
    currentUserProfile: {},
    organizations: []
})

export const mutations = {
    ...vuexfireMutations,
    setCurrentUser(state, user) {
        state.currentUser = user
    },
    setCurrentUserProfile(state, userProfile) {
        state.currentUserProfile = userProfile
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
    getCurrentUserProfile: (state) => {
        return state.currentUserProfile
    },
    getOrganizations: (state) => {
        return state.organizations
    }
}
