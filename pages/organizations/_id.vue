<template lang="pug">
.container
  h1
    | {{organization.name}}
</template>

<script>
import { db } from '~/plugins/firestore.js'
import { mapState } from 'vuex'
import { isUndefined, isEmpty } from 'lodash/lodash'

export default {

  async created() {
    const doc = await db.collection('organizations').doc(this.$route.params.id).get()
    if (this.isLogin() && !isEmpty(doc.data())) {
      this.organization = doc.data()
      return
    }
    this.$router.push({path: '/'})
    return
  },

  data() {
    return {
      organization: {}
    }
  },

  computed: {
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
