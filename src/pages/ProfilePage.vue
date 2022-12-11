<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 bg-dark text-wrap">
        <Login />
      </div>
      <div class="col-md-6">
        <div class="p-1 shadow bg-light rounded m-1">
        <!-- <Profile-details /> -->
        <ProfileDetails/>
      
        </div>
            <div class="d-flex px-3 justify-content-center">
              <div class="d-flex flex-column text-center">
               <p> Page: {{page.page}}</p> 

               <div class="p-3 mx-2">
                <i class="mdi mdi-chevron-left"></i>
               <button class="mx-3" @click="newerPage(-1)">Newer posts</button> 
               <button class="mx-3" @click="olderPage(1)">Older posts</button>
               <i class="mdi mdi-chevron-right"></i>
               </div>
              <!-- <div class="d-flex">
           <div @click="changeProfilePage(-1)" class="pop d-flex fs-2">
        <i class="mdi mdi-chevron-left mt-4"></i>
        <i class="mdi mdi-chevron-left mt-4"></i>
           </div>

           <div @click="changeProfilePage(1)" class="pop d-flex fs-2">
        <i class="mdi mdi-chevron-right mt-4"></i>
        <i class="mdi mdi-chevron-right mt-4"></i>
              </div>
              </div> -->
           </div>
          </div>
        <Post v-for="p in activePosts" :key="p.id" :post="p" />
      </div>
      <div class="col-md-3">
        <Billboard v-for="b in billboards" :key="b.id" :billboards="b" />
      </div>
          <!-- <div class="d-flex px-3 justify-content-center">
           <p>Page: {{page.page}}</p> 
           <div @click="changeProfilePage(-1, newer)" class="pop d-flex fs-2">
        <i class="mdi mdi-chevron-left mt-4"></i>
        <i class="mdi mdi-chevron-left mt-4"></i>
           </div>

           <div @click="changeProfilePage(1, older)" class="pop d-flex fs-2">
        <i class="mdi mdi-chevron-right mt-4"></i>
        <i class="mdi mdi-chevron-right mt-4"></i>
           </div>
          </div> -->
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import Billboard from "../components/Billboard.vue";
import { billboardsService } from "../services/BillboardsService";
import ProfileDetails from "../components/ProfileDetails.vue";
import AccountPageVue from './AccountPage.vue';
import { accountService } from '../services/AccountService';
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
      activeProfile: computed(()=> AppState.activeProfile),
      account: computed(()=> AppState.account),
      page: computed(()=> AppState.pageData),
      older: computed(()=> AppState.olderPage),
      newer: computed(()=> AppState.newerPage),

      async olderPage(value) {
          let newProfilePage = AppState.currentProfilePage += value
          if(newProfilePage <= 0){
            Pop.toast('You cannot go there', 'warning')
            return
          }
          if(newProfilePage > AppState.pageData.totalPages){
            Pop.toast('You cannot go any further', 'warning')
            return
          }
          await postsService.olderPage()
      },
      async newerPage(value) {
          let newProfilePage = AppState.currentProfilePage += value
          if(newProfilePage <= 0){
            Pop.toast('You cannot go there', 'warning')
            return
          }
          if(newProfilePage > AppState.pageData.totalPages){
            Pop.toast('You cannot go any further', 'warning')
            return
          }
          await postsService.newerPage()
      },

             async changeProfilePage(value){
        let newProfilePage = AppState.currentProfilePage += value
         if(newProfilePage <= 0 ) {
          Pop.toast('You shall not pass', "warning")
          return
          }
          if(newProfilePage > AppState.pageData.totalPages){
            Pop.toast('Nowhere left to go', "warning")
            return
          }
        await postsService.changeProfilePage(newProfilePage, route.params.id)
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