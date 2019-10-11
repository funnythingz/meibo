<template lang="pug">
.container
  h1
    | ユーザープロフィール
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
import { db } from '~/plugins/firestore.js'
import { mapState } from 'vuex'
import { isEmpty } from 'lodash/lodash'

export default {

  async created() {
    const userProfileRef = await db.collection('users').doc(this.$route.params.id).get()
    if (this.isLogin() && !isEmpty(userProfileRef.data())) {
      this.$store.commit('setCurrentUserProfile', userProfileRef.data())
      return
    }
    this.$router.push({path: '/'})
    return
  },

  data() {
    return {
      user: {}
    }
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
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
