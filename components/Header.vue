<template lang="pug">
  header
    .field(v-if="isLogin()")
      ul
        li
          a(@click.stop="toMe()")
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

    toMe() {
      this.$router.push({path: `/me`})
    }

  }

}
</script>

<style lang="sass" scoped>
</style>
