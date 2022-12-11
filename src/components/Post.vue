<template>
  <div class="row mt-1 cards shadow elevation-5">
    <div class="d-flex p-3">
      <!-- <router-link> -->
      <img :src="post.creator.picture" alt="Profile pic" title="Go To Profile" class="img-fluid selectable"
        style="max-height: 100px; border-radius: 50%" @click.stop="navigateTo('Profile', { id: post.creatorId })" />
      <!-- </router-link> -->
      <div class="mx-3">
        <h3 class="text-break">{{ post.creator.name }}</h3>
        <h5>{{ post.creator.bio }}</h5>
        <div class="d-flex justify-content-between">
          {{ post.updatedAt.substring(0, 10) }}


        </div>
      </div>
      <!-- THIS CHECKS IF YOU ARE OWNER, and REVEALS ELEMENT -->
      <div class="text-end" v-if="post.creatorId == account.id">
        <i class="mdi mdi-delete selectable ms-3" @click="deletePost(post.id)"></i>
        <!-- <i class="mdi mdi-pencil selectable ms-3" @click="editPost(post.id)"></i> -->
      </div>

    </div>
    <!-- contains post body, likes, and image -->
    <div class="div">
      <div class="d-flex justify-content-between">

        <div class="bg-light rounded p-2" style="width: 100%">
          <p class="">
            {{ post.body }}
          </p>
        </div>
        <!-- like button -->
      </div>
      <img class="img-fluid p-1 rounded" :src="post.imgUrl" alt="post image" title="user submission">
    </div>
    <!-- Likes -->
    <div class="likes d-flex justify-content-end mb-2">
      <i v-if="!post.likeIds.includes(account.id)" class="mdi mdi-heart-outline selectable  elevation-1" title="likes"
        @click="likePost(post.id)"></i>
      <i v-else class="mdi mdi-heart selectable  elevation-5" title="likes" @click="likePost(post.id)"></i>
      <div class="text ms-2">{{ post.likes.length }}</div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from "vue-router";
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    return {

      account: computed(() => AppState.account),
      navigateTo(name, params) {
        router.push({ name, params });
        AppState.currentPage = 1
      },

      async deletePost(id) {
        try {
          if (await Pop.confirm()) {
            // const foundPost = await postsService.getById(route.params.id)
            await postsService.deletePost(id)
            Pop.toast("Post deleted", 'success')
          }
        } catch (error) {
          Pop.toast("Could not delete post", 'error')
        }
      },

      async likePost(id) {
        try {
          await postsService.likePost(id)
          AppState.activePost = id
          Pop.toast("Post liked", 'success')
        }
        catch (error) {
          Pop.toast("Could not delete post", 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.likes {
  color: #d33dd3;
  font-weight: bold;
}

.cards {
  border: round;
  border-color: #d33dd3;
  border-radius: 20px;
  border-style: solid 4px;
  border-width: 8px;
}

.prof-img {
  width: 20px;
  height: 20px;
}

.body-text {
    font-size: 16px;
    color: lavender
}
</style>