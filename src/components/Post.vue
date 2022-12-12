<template>
  <div class="row mt-1 cards shadow elevation-5">
    <div class="d-flex p-3 mt-3">
      <!-- <router-link> -->
      <img :src="post.creator.picture" alt="Profile pic" title="Go To Profile"
        class="img-fluid selectable rounded-circle prof-img"
        @click.stop="navigateTo('Profile', { id: post.creatorId })" />
      <!-- </router-link> -->
      <div class="mx-3">
        <p class="text-break fw-bold name">{{ post.creator.name }}</p>
        <!-- <p class="">{{ post.creator.bio }}</p> -->
        <div class="d-flex justify-content-between date">
          {{ post.updatedAt.substring(0, 10) }}

        </div>
      </div>
      <!-- THIS CHECKS IF YOU ARE OWNER, and REVEALS ELEMENT -->
      <div class="text-end" v-if="post.creatorId == account.id">
        <i class="mdi mdi-delete selectable ms-3 justify-text-left" @click="deletePost(post.id)"></i>
        <!-- <i class="mdi mdi-pencil selectable ms-3" @click="editPost(post.id)"></i> -->
      </div>

    </div>
    <!-- contains post body, likes, and image -->
    <div class="div">
      <div class="d-flex justify-content-between">

        <div class="rounded p-1" style="width: 100%">
          <p class="body-text">
            {{ post.body }}
          </p>
        </div>
        <!-- image -->
      </div>
      <img class="img-fluid p-1 rounded" :src="post.imgUrl || 'https://thiscatdoesnotexist.com'" alt="post image"
        title="user submission">
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
  background-color: black;
}

.prof-img {
  width: 3em;
  height: 3em;
}

.name {
  color: #c391ee;
  font-size: 1.5em;
  font-family: 'Creepster', cursive;
}

.body-text {
  font-size: 1em;
  color: #c391ee
}

.date {
  font-size: .75em;
  color: #c391ee
}
</style>