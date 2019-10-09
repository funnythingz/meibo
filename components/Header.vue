<template lang="pug">
  header
    .field(v-if="isLogin()")
      | {{currentUser.email}}
    .field(v-else)
      | 未ログインだよ
</template>

<script>
import firebase from 'firebase'
import isEmpty from 'lodash/isEmpty'
import { mapState } from 'vuex'

export default {

  computed: mapState(['currentUser']),

  created() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      this.$store.commit('setCurrentUser', currentUser)
    })
  },

  methods: {

    logout() {
      this.$router.push({path: '/logout'})
    },

    isLogin() {
      return !isEmpty(this.currentUser)
    },

    isLogout() {
      return isEmpty(this.currentUser)
    }

  }

}
</script>

<style lang="sass" scoped>
</style>
