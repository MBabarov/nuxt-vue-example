<template>
  <main
    role="main"
    class="main">
    <section class="jumbotron text-center">
      <div class="container">
        <div class="user">
          <div class="row">
            <div class="col-md-3 col-lg-3 "/>
            <div
              class=" col-md-9 col-lg-9">
              <h1>Create new user profile</h1>
            </div>
          </div>
          <Loading v-show="loading" />
          <UserForm
            v-show="!loading"
            :user="user" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '~/components/Loading.vue'
import UserForm from '~/components/UserForm.vue'

export default {
  name: 'NewUserPage',
  components: {
    Loading,
    UserForm
  },
  data() {
    return {
      user: {
        about: '',
        registered: '',
        firstName: '',
        lastName: '',
        age: null,
        company: '',
        email: '',
        phone: '',
        address: '',
        picture: 'http://placehold.it/128x128'
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  mounted() {
    this.$store.commit('changeLoadingState', false)
  }
}
</script>

<style scoped>
.main {
  margin-top: 100px;
}
.jumbotron {
  margin-bottom: 0;
}
</style>
