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
      label(for="input_email")
        | Email
      input.input#input_email(type="email" placeholder="Email" v-model="input.email" required)
  .field
    .control
      label(for="input_password")
        | Password
      input.input#input_password(type="password" placeholder="Password" v-model="input.password" required)
  .field
    .columns
      .column
        .field
          .control
            label(for="input_lastname")
              | 氏
            input.input#input_lastname(type="input" placeholder="氏" v-model="input.profile.lastname" required)
      .column
        .field
          .control
            label(for="input_firstname")
              | 名
            input.input#input_firstname(type="input" placeholder="氏" v-model="input.profile.firstname" required)
  .field
    .columns
      .column
        .field
          .control
            label(for="input_birth_month")
              | 生年月日 month
            select#input_birth_month(v-model="input.birth_months.selected")
              option(v-for="option in input.birth_months.options" v-bind:value="option")
                | {{ option }}
      .column
        .field
          .control
            label(for="input_birth_day")
              | 生年月日 day
            select#input_birth_day(v-model="input.birth_days.selected")
              option(v-for="option in input.birth_days.options" v-bind:value="option")
                | {{ option }}
      .column
        .field
          .control
            label(for="input_birth_year")
              | 生年月日 year
            select#input_birth_year(v-model="input.birth_years.selected")
              option(v-for="option in input.birth_years.options" v-bind:value="option")
                | {{ option }}
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
import { db } from '~/plugins/firestore.js'
import ProfileHelper from '~/mixins/ProfileHelper.js'
import isEmpty from 'lodash/isEmpty'
import { mapState } from 'vuex'

export default {

  layout: 'plain',

  mixins:[
    ProfileHelper
  ],

  data() {
    return {
      input: {
        profile: {},
        birth_months: {
          selected: 12,
          options: this.monthCollection()
        },
        birth_days: {
          selected: 28,
          options: this.dayCollection()
        },
        birth_years: {
          selected: 1999,
          options: this.yearCollection()
        }
      },
      error: ''
    }
  },

  computed: mapState(['currentUser']),

  async created() {
    //TODO: 組織名一覧を取得する
    const organizations = await db.collection('organizations').get()
    console.log(organizations.docs[0].data())
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
        await firebase.auth().createUserWithEmailAndPassword(this.input.email, this.input.password)
        firebase.auth().onAuthStateChanged((currentUser) => {
          this.$store.commit('setCurrentUser', currentUser)
          this.commitUserProfile(currentUser)
          if (this.isLogin()) {
            this.$router.push({path: `/users/${this.currentUser.uid}`})
          }
        })
      } catch(error) {
        console.log(error)
        this.error = error
      }
    },

    async commitUserProfile(user) {
      const userProfileRef = await db.collection('users').doc(user.uid).set({
        first_name: this.input.profile.firstname,
        last_name: this.input.profile.lastname,
        birth_month: this.input.birth_months.selected,
        birth_day: this.input.birth_days.selected,
        birth_year: this.input.birth_years.selected
      })
      this.$store.commit('setCurrentUserProfile', userProfileRef)
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
