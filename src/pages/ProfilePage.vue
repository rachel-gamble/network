<template>
  <div class="container-fluid text">
    <div class="row">
      <div class="col-md-3 text-wrap mt-3">
        <Login />
      </div>
      <div class="col-md-6">
        <div class="p-1 shadow rounded m-1">
          <!-- <Profile-details /> -->
          <ProfileDetails />

          <!-- Page Count -->
        </div>
        <div class="d-flex px-3 justify-content-center">
          <div class="d-flex flex-column text-center">
            <p> Page: {{ page.page }}</p>

            <!-- Page Function -->
            <div class="p-3 mx-2">
              <i class="mdi mdi-chevron-left"></i>
              <button class="mx-3--" @click="pageBack()">Newer posts</button>
              <button class="mx-3" @click="pageForward()">Older posts</button>
              <i class="mdi mdi-chevron-right"></i>
            </div>

          </div>
        </div>
        <Post v-for="p in activePosts" :key="p.id" :post="p" />
      </div>
      <div class="col-md-3">
        <Billboard v-for="b in billboards" :key="b.id" :billboards="b" />
      </div>


    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import Billboard from "../components/Billboard.vue";
import { billboardsService } from "../services/BillboardsService";
import ProfileDetails from "../components/ProfileDetails.vue";
import AccountPageVue from './AccountPage.vue';
import { accountService } from '../services/AccountService.js';
export default {
  setup() {
    const route = useRoute();
    // const editing = ref(false);

    onMounted(async () => {
      try {
        await postsService.getByQuery({ creatorId: route.params.id });
        await billboardsService.getBillboards();
        await profilesService.getProfileById(route.params.id);
        // logger.log(older.olderPage, newer.newerPage)
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      //   editing,
      route,
      // profileRoute,
      activePosts: computed(() => AppState.activePosts),
      billboards: computed(() => AppState.activeBillboards),
      activeProfile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      page: computed(() => AppState.pageData),
      older: computed(() => AppState.olderPage),
      newer: computed(() => AppState.newerPage),
      posts: computed(() => AppState.allPosts),

      async pageBack() {
        let newPage = AppState.pageData.newer;
        if (newPage == null) {
          Pop.toast("You're on the first page, silly", "warning")
          return;
        }
        try {
          await profilesService.changePage(newPage)
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async pageForward() {
        let newPage = AppState.pageData.older;
        if (newPage == null) {
          Pop.toast("This is the end", "warning")
          return;
        }
        try {
          await profilesService.changePage(newPage)
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async likePost(id) {
        try {
          await profileService.likePost(id)
          AppState.activePost = id
          Pop.toast("Post liked", 'success')
        }
        catch (error) {
          Pop.toast("Could not delete post", 'error')
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.pop:hover {
  transform: scale(1.03);
  color: yellow;
  box-shadow: 2px, 2px, 2px;
  cursor: pointer;
}

.text {
  color: #c391ee;
}
</style>