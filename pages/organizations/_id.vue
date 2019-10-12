<template lang="pug">
.container
  h1
    | {{organization.name}}
  dl(v-if="hasUser()")
    dt
      | 所属メンバー
    dd
      ul
        li(v-for="user in inUsers")
          a(@click="toUser(user.id)")
            | {{user.profile.last_name}} {{user.profile.first_name}}
</template>

<script>
import { db } from '~/plugins/firestore.js'
import { mapState } from 'vuex'
import { isUndefined, isEmpty, map } from 'lodash/lodash'

export default {

  async created() {
    const doc = await db.collection('organizations').doc(this.$route.params.id).get()
    if (this.isLogin() && !isEmpty(doc.data())) {
      this.organization = doc.data()
      this.inUsersData(doc.id)
      return
    }
    this.$router.push({path: '/'})
    return
  },

  data() {
    return {
      organization: {},
      inUsers: []
    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  methods: {
    isLogin() {
      return !isEmpty(this.currentUser)
    },

    async inUsersData(organizationId) {
      const userRef = await db.collection('users').where('organization_id', '==', organizationId).get()
      this.inUsers = map(userRef.docs, v => {
        return {id: v.id, profile: v.data()}
      })
    },

    hasUser() {
      return !isEmpty(this.inUsers)
    },

    toUser(uid) {
      this.$router.push({path: `/users/${uid}`})
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
