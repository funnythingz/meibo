<template lang="pug">
.container
  .field
    h1
      | login
  .field(v-if="hasError()")
    p.notification.is-danger
      | {{error.message}}
  .field
    .control
      input.input(type="email" placeholder="Email" v-model="email")
  .field
    .control
      input.input(type="password" placeholder="Password" v-model="password")
  .field
    .control
      button.button(@click="login()")
        | login
  .field
    p
      nuxt-link(to="/sign_in")
        | 新規アカウント作成はこちら
</template>

<script>
import firebase from 'firebase'
import isEmpty from 'lodash/isEmpty'
import { mapState } from 'vuex'

export default {

  layout: 'plain',

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
    async login() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
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
