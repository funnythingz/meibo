<template lang="pug">
.container
  h1
    | meibo
  Organizations
</template>

<script>
import BeforeLogin from '~/mixins/BeforeLogin'
import Organizations from '~/components/Organizations'
import { mapState } from 'vuex'

export default {

  mixins: [
    BeforeLogin
  ],

  components: {
    Organizations
  },

  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="sass" scoped>
</style>
