<template lang="pug">
.container
  dl
    dt
      | 名前
    dd
      | {{user.last_name}} {{user.first_name}}
  dl
    dt
      | 生年月日
    dd
      | {{user.birth_month}}/{{user.birth_day}}/{{user.birth_year}}
</template>

<script>
import { db } from '~/plugins/firestore.js'
import { mapState } from 'vuex'
import { isEmpty } from 'lodash/lodash'

export default {

  async created() {
    const doc = await db.collection('users').doc(this.$route.params.id).get()
    if (this.isLogin() && !isEmpty(doc.data())) {
      this.user = doc.data()
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
