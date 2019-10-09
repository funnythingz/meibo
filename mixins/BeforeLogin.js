import { mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {

  async created() {
    if (await isEmpty(this.currentUser)) {
      this.$router.push({path: '/login'})
    }
  },

  computed: {
    ...mapState(['currentUser'])
  }

}
