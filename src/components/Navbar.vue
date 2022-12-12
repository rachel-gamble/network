<template>


  <nav class="navbar navbar-expand-lg navbar-dark px-3 sticky-top pt-2">
    <div class="d-flex container">

      <!-- <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }"> -->
      <div @click="goHome()" class="navbar-brand d-flex selectable fw-bold">
        <div class="d-flex flex-column align-items-center">
          <p class="network mt-2"><i>The Network</i></p>
        </div>

      </div>
      <!-- </router-link> -->
      <form @submit.prevent="findPosts()" class="input-group p-4 ms-3">
        <input v-model="query" required type="text" name="search" class="form-control" placeholder="Search for posts..."
          aria-label="Search for post" aria-describedby="button-addon2" />
        <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
          Search...
        </button>
      </form>

      <div class="p-3">
        <!-- <button
           @click="resetPage()"
          class="btn btn-outline-danger p-3"
          type="submit"
          id="reset-page"
        >
          Redraw Posts
        </button> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { profilesService } from '../services/ProfilesService';
export default {
  setup() {
    const router = useRouter()
    const query = ref('')
    return {
      //remember comma separation between functions here
      query,
      page: computed(() => AppState.pageData),
      totalPages: computed(() => AppState.totalPages),
      async goHome() {
        try {
          router.push('/')
          await postsService.getPosts()
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      },
      async findPosts() {
        try {
          router.push('/')
          await postsService.search(query.value)
          // await profilesService.search(query.value)
          Pop.toast('it did not fail', 'success')
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log('Could not commit to that search')
        }
      },
      async findPeople() {
        try {
          router.push('/')
          await profilesService.search()
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async resetPage() {
        try {
          AppState.activePosts = null
          AppState.allPosts = null
          await postsService.getPosts()
        } catch (error) {
          Pop.toast('Failure', 'error')
        }
      },
      navigateTo(name, params) {
        router.push({ name, params });
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  /* background: linear-gradient(to right, #fc65fc, #BBEBEB); */
  background: linear-gradient(to right, #fc65fc, #000000);
  padding: 2px;
}

.network {
  font-family: 'Creepster', cursive;
  color:#000000;
  font-size: 2em;
}
</style>
