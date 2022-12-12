<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 mt-3">
        <!-- LOGIN  -->
        <Login />
      </div>
      <div class="col-md-7">
        <div class="d-flex justify-content-between">

          <button v-if="user.isAuthenticated" type="button" title="Click to open form" class="btn btn-info m-5"
            data-bs-toggle="modal" data-bs-target="#exampleModal">
            New Post
          </button>

          <!--PAGE COMPONENT-->
          <div class="d-flex flex-column align-items-center">
            <p class="mt-4">Page: {{ page.page }}</p>

            <div class="d-flex px-3">
              <div @click="pageBack()" class="pop d-flex fs-2">
                <i class="mdi mdi-chevron-left mt-4"></i>
                <i class="mdi mdi-chevron-left mt-4"></i>
              </div>

              <div @click="pageForward()" class="pop d-flex fs-2">
                <i class="mdi mdi-chevron-right mt-4"></i>
                <i class="mdi mdi-chevron-right mt-4"></i>
              </div>
            </div>

          </div>
        </div>
        <hr />
        <!-- MAIN SITE BODY -->
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <!-- ToDo: Ads here -->
      <div class="col-md-3">
        <Billboard v-for="b in billboards" :key="b.id" :billboards="b" />
      </div>

      <!--Page Numbers Here-->
      <div class="d-flex px-3 justify-content-center">
        <div @click="pageBack()" class="pop d-flex fs-2">
          <i class="mdi mdi-chevron-left mt-4"></i>
          <i class="mdi mdi-chevron-left mt-4"></i>
        </div>

        <div @click="pageForward()" class="pop d-flex fs-2">
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

      async pageBack() {
        let newPage = AppState.pageData.newer;
        if (newPage == null) {
          Pop.toast("You're on the first page, silly", "warning")
          return;
        }
        try {
          await postsService.changePage(newPage)
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
          await postsService.changePage(newPage)
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
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

.link {
  outline: #c391ee;
  color: #c391ee;
}
</style>