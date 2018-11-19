<template>
  <main
    role="main"
    class="main">
    <section class="jumbotron text-center">
      <div class="container">
        <div class="user">
          <div class="row">
            <div
              class="col-md-3 col-lg-3 "
              align="center"/>
            <div
              class=" col-md-9 col-lg-9"
              align="left">
              <div class="row">
                <div
                  class=" col-md-6 col-lg-6"
                  align="left">
                  <h1>Edit user profile</h1>
                </div>
                <div
                  class="col-md-3 col-lg-3 "
                  align="center">
                  <router-link
                    :to="`/user/${id}`"
                    tab="button"
                    class="btn btn-primary">
                    Come back without updates
                  </router-link>
                </div>
              </div>
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
import axios from '~/plugins/axios'
// import UserForm from '~/components/UserForm'

export default {
  name: 'EditUserPage',
  components: {
    Loading: () => import('@/components/Loading'),
    UserForm: () => import('@/components/UserForm')
  },
  data() {
    return {
      user: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    }),
    id() {
      return Number(this.$route.params.id)
    }
  },
  watch: {
    $route: 'loadUser'
  },
  mounted() {
    this.loadUser()
  },
  asyncData({ params }) {
    return axios
      .get(`http://localhost:3004/users/${params.id}`)
      .then(response => response.data)
      .then(response => {
        return {
          user: response
        }
      })
  },
  methods: {
    loadUser() {
      this.$store.dispatch('loadUser', this.id).then(response => {
        this.user = response.data
      })
    }
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
