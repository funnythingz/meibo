<template lang="pug">
.container
  h1
    | ユーザープロフィール
  .field
    dl
      dt
        | 名前
      dd
        | {{userProfile.last_name}} {{userProfile.first_name}}
    dl
      dt
        | 生年月日
      dd
        | {{userProfile.birth_month}}/{{userProfile.birth_day}}/{{userProfile.birth_year}}
    dl
      dt
        | 所属組織
      dd
        a(@click.prevent="toOrganization()")
          | {{userOrganization.name}}
</template>

<script>
import { db } from '~/plugins/firestore.js'
import { mapState } from 'vuex'
import { isEmpty } from 'lodash/lodash'

export default {

  async created() {
    const userProfileRef = await db.collection('users').doc(this.$route.params.id).get()
    if (this.isLogin() && !isEmpty(userProfileRef.data())) {
      this.userProfile = userProfileRef.data()
      this.userOrganizationData(this.userProfile.organization_id)
      return
    }
    this.$router.push({path: '/'})
    return
  },

  data() {
    return {
      userProfile: {},
      userOrganization: {}
    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  methods: {
    isLogin() {
      return !isEmpty(this.currentUser)
    },

    async userOrganizationData(organizationId) {
      const organizationRef = await db.collection('organizations').doc(organizationId).get()
      if (!isEmpty(organizationRef.data())) {
        this.userOrganization = organizationRef.data()
      }
    },

    toOrganization() {
      this.$router.push({path: `/organizations/${this.userProfile.organization_id}`})
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
