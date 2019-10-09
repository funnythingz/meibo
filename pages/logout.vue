<template lang="pug">
</template>

<script>
import firebase from 'firebase'

export default {
  mounted() {
    this.signOut()
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut()
        this.$router.push({path: '/'})
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
