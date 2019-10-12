<template lang="pug">
.container
  h1
    | meibo
  Organizations
</template>

<script>
import Organizations from '~/components/Organizations'
import { mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {

  async created() {
    if (await isEmpty(this.currentUser)) {
      this.$router.push({path: '/login'})
    }
  },

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
