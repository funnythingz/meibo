<template lang="pug">
ul
  li(v-for="org in organizations")
    | {{org.name}}
</template>

<script>
import { db } from '~/plugins/firestore.js'
import { mapGetters } from 'vuex'

export default {

  created() {
    this.$store.dispatch('setOrganizationsRef', db.collection('organizations').orderBy('name', 'asc'))
  },

  computed: {
    ...mapGetters({ organizations: 'getOrganizations' }),
  }
}
</script>

<style lang="sass" scoped>
</style>
