<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <!-- this is where i inject the login/user info -->
        <Login />
      </div>
      <div class="col-md-7">
        <div class="d-flex justify-content-between">

          <button v-if="user.isAuthenticated" type="button" title="Click to open form" class="btn btn-success m-3"
            data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create a post!
          </button>

          <!--PAGE COMPONENT-->
          <div class="d-flex flex-column align-items-center">
            <p class="mt-4">Page: {{ page.page }}</p>

            <div class="d-flex px-3">
              <div v-if="currentPage > 1" @click="changePage()" class="pop d-flex fs-2">
                <i class="mdi mdi-chevron-left mt-4"></i>
                <i class="mdi mdi-chevron-left mt-4"></i>
              </div>

              <div v-if="currentPage < totalPages" @click="changePage(1)" class="pop d-flex fs-2">
                <i class="mdi mdi-chevron-right mt-4"></i>
                <i class="mdi mdi-chevron-right mt-4"></i>
              </div>
            </div>

          </div>
        </div>
        <hr />
        <!-- This is the main body of the site -->
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <!-- Ads here -->
      <div class="col-md-3">
        <Billboard v-for="b in billboards" :key="b.id" :billboards="b" />
      </div>
      <div class="d-flex px-3 justify-content-center">
        <div @click="changePage(-1)" class="pop d-flex fs-2">
          <i class="mdi mdi-chevron-left mt-4"></i>
          <i class="mdi mdi-chevron-left mt-4"></i>
        </div>

        <div @click="changePage(1)" class="pop d-flex fs-2">
          <i class="mdi mdi-chevron-right mt-4"></i>
          <i class="mdi mdi-chevron-right mt-4"></i>
        </div>
      </div>

    </div>
  </div>

  <Modal id="exampleModal">
    <template #modal-body-slot>
      <CreatePost />
    </template>
  </Modal>
</template>
// :post="p"

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService.js";
import { AppState } from "../AppState";
import { billboardsService } from "../services/BillboardsService.js";
import Modal from "../components/Modal.vue";

export default {
  components: { Modal },
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
        await billboardsService.getBillboards();

      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      user: computed(() => AppState.user),
      page: computed(() => AppState.pageData),
      posts: computed(() => AppState.allPosts),
      billboards: computed(() => AppState.activeBillboards),
      totalPages: computed(() => AppState.totalPages),
      currentPage: computed(() => AppState.currentPage),

      async changePage() {

        let newPage = AppState.currentPage += value

        if (newPage <= 0) {
          Pop.toast('this is the first page, silly', "warning")
          return
        }
        if (newPage > AppState.pageData.totalPages) {
          Pop.toast('Nowhere left to go', "warning")
          return
        }
        try {
          await postsService.changePage(newPage)

        } catch (error) {
          Pop.toast('did not go', 'error')

        }
      },
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
</style>