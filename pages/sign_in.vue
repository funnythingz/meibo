<template lang="pug">
.container
  .field
    h1
      | sign_in
  .field(v-if="hasError()")
    p.notification.is-danger
      | {{error.message}}
  .field
    .control
      input.input(type="email" placeholder="Email" v-model="email" required)
  .field
    .control
      input.input(type="password" placeholder="Password" v-model="password" required)
  .field
    .control
      button.button(@click="signIn()")
        | sign in
  .field
    p
      nuxt-link(to="/login")
        | loginはこちら
</template>

<script>
import firebase from 'firebase'
import isEmpty from 'lodash/isEmpty'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  computed: mapState(['currentUser']),

  created() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      this.$store.commit('setCurrentUser', currentUser)
      if (this.isLogin()) {
        this.$router.push({path: '/'})
      }
    })
  },

  methods: {
    async signIn() {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$router.push({path: '/'})
      } catch(error) {
        console.log(error)
        this.error = error
      }
    },

    hasError() {
      return !isEmpty(this.error)
    },

    isLogin() {
      return !isEmpty(this.currentUser)
    }

  }
}
</script>
