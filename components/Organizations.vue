<template lang="pug">
ul
  li(v-for="org in organizations")
    a(@click.prevent="toOrganization(org.id)")
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
  },

  methods: {
    toOrganization(organizationId) {
      this.$router.push({path: `/organizations/${organizationId}`})
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
