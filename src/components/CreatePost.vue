<template>
  <div class="component">
    <form @submit.prevent="createPost">
      <!-- <input
        type="text"
        class="form-control"
        placeholder="Post Title"
        v-model="newPost.title"
      /> -->
      <textarea
        class="form-control mt-3"
        placeholder="Post Body"
        v-model="newPost.body"
        required
        minlength="3"
      ></textarea>
      <input
        type="url"
        class="form-control mt-3"
        placeholder="Post Picture URL"
        v-model="newPost.imgUrl"
      />
      <!-- <input
        type="text"
        class="form-control"
        placeholder="Add Tags"
        v-model="newPost.tagEntry"
      /> 
      <span><small>* press space to add tag</small></span> -->
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button
        
          type="button"
          class="btn btn-outline-danger" 
          data-bs-dismiss="modal"
          @click="closeForm"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import Modal from './Modal.vue';
export default {
  components: { Modal },

  setup() {
    const newPost = ref({})

    return {
      newPost,
      async createPost() {
        try {
          
          await postsService.createPost(newPost.value);
          newPost.value = {}
          Pop.toast("Created post", "success")
          // Modal.getOrCreateInstance(document.getElementById('exampleModal')).toggle()
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>