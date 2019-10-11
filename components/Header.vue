<template lang="pug">
  header
    .field(v-if="isLogin()")
      ul
        li
          a(@click.stop="toMypage()")
            | プロフィールを見る
        li
          a(href="/logout")
            | logout
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
    },

    toMypage() {
      this.$router.push({path: `/users/${this.currentUser.uid}`})
    }

  }

}
</script>

<style lang="sass" scoped>
</style>
