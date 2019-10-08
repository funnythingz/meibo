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

export default {

  data() {
    return {
      title: 'meibo'
    }
  },

  created() {
    this.$store.dispatch('setOrganizationsRef', db.collection('organizations'))
  },

  computed: {
    ...mapGetters({ organizations: 'getOrganizations' }),
    ...mapState(['currentUser'])
  },
}
</script>

<style lang="sass" scoped>
</style>
