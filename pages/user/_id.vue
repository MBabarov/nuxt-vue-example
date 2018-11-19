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
                  <h1>User profile</h1>
                </div>
                <div
                  class="col-md-3 col-lg-3 "
                  align="center">
                  <router-link
                    tab="button"
                    class="btn btn-primary"
                    to="/">
                    Come back to users list
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <Loading v-show="loading" />
          <CurrentUser
            v-show="!loading"
            :current-user="currentUser" />
        </div>
      </div>
    </section>
  </main>

</template>

<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'

export default {
  name: 'UserPage',
  components: {
    Loading: () => import('@/components/Loading'),
    CurrentUser: () => import('@/components/CurrentUser')
  },
  data() {
    return {
      currentUser: null
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
  fetch({ store }) {
    return store.commit('changeLoadingState', true)
  },
  asyncData({ params }) {
    return axios
      .get(`http://localhost:3004/users/${params.id}`)
      .then(response => response.data)
      .then(response => {
        return {
          currentUser: response
        }
      })
  },
  methods: {
    loadUser() {
      this.$store.dispatch('loadUser', this.id).then(response => {
        this.currentUser = response.data
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
