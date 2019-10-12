<template lang="pug">
.container
  h1
    | マイページ
  .field(v-if="hasUserProfile()")
    dl
      dt
        | Account
      dd
        | {{currentUser.email}}
    dl
      dt
        | 名前
      dd
        | {{currentUserProfile.last_name}} {{currentUserProfile.first_name}}
    dl
      dt
        | 生年月日
      dd
        | {{currentUserProfile.birth_month}}/{{currentUserProfile.birth_day}}/{{currentUserProfile.birth_year}}
</template>

<script>
import firebase from 'firebase'
import { db } from '~/plugins/firestore.js'
import { mapState } from 'vuex'
import { isEmpty } from 'lodash/lodash'

export default {

  created() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      this.$store.commit('setCurrentUser', currentUser)
      if (this.isLogin()) {
        this.userProfleData(this.currentUser)
        return
      }
      this.$router.push({path: '/'})
    })
  },

  computed: {
    ...mapState(['currentUser', 'currentUserProfile'])
  },

  methods: {
    isLogin() {
      return !isEmpty(this.currentUser)
    },
    hasUserProfile() {
      return !isEmpty(this.currentUserProfile)
    },

    async userProfleData(currentUser) {
      const userProfileRef = await db.collection('users').doc(currentUser.uid).get()
      if (!isEmpty(userProfileRef.data())) {
        this.$store.commit('setCurrentUserProfile', userProfileRef.data())
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
