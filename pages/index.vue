<template lang="pug">
.container
  h1
    | {{title}}
  div(v-for="org in organizations")
    ul
      li
        | {{org.name}}
</template>

<script>
import { db } from '~/plugins/firestore.js'
import { mapGetters, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {

  data() {
    return {
      title: 'meibo'
    }
  },

  created() {
    if (!this.isLogin()) {
      this.$router.push({path: '/login'})
    }
    this.$store.dispatch('setOrganizationsRef', db.collection('organizations'))
  },

  computed: {
    ...mapGetters({ organizations: 'getOrganizations' }),
    ...mapState(['currentUser'])
  },

  methods: {
    isLogin() {
      return !isEmpty(this.currentUser)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
