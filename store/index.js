import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const strict = false

export const state = () => ({
    currentUser: {},
    currentUserProfile: {},
    currentUserOrganization: {},
    organizations: []
})

export const mutations = {
    ...vuexfireMutations,
    setCurrentUser(state, user) {
        state.currentUser = user
    },
    setCurrentUserProfile(state, userProfile) {
        state.currentUserProfile = userProfile
    },
    setCurrentUserOrganization(state, organization) {
        state.currentUserOrganization = organization
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
    getCurrentUserOrganization: (state) => {
        return state.currentUserOrganization
    },
    getOrganizations: (state) => {
        return state.organizations
    }
}
