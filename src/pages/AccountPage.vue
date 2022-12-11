<template>
  <div class="about text-center">
    <img :src="account.coverImg" alt="" />
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <h3>{{ account.email }}</h3>
    <p>{{ account.bio }}</p>

      <div class="d-flex justify-content-center">
    <div class="d-flex flex-column align-items-start">

      <span> <b>Github</b> {{ account.github }}</span>
      <span> <b>Linkedin:</b> {{ account.linkedin }}</span>
      <span> <b>Resume:</b>  {{ account.resume }}</span>
      <span> <b>Class:</b> {{ account.class }}/ <b>Graduate?</b> {{ account.graduated }}</span>
      </div>
    </div>

  </div>

  <form class="input-group bg-dark p-3" @submit.prevent="editProfile(formData)">
    <div class="d-flex">
      <div class="d-flex flex-column profile-form">
        <label for="email">Account email</label>
        <input type="text" name="email" placeholder="email..." />
        <label class="mt-2" for="name">Change username</label>
        <input
          class="mt-2"
          type="text"
          name="name"
          placeholder="new username..."
          v-model="account.name"
        />
        <label class="mt-2" for="picture"
          >Enter a URL link to your profile picture
        </label>
        <input
          class="mt-2"
          type="url"
          name="picture"
          placeholder="https://something.jpg"
          v-model="account.picture"
        />
        <label for="bio">Bio</label>
        <input
          type="text"
          name="bio"
          placeholder="Bio..."
          v-model="account.bio"
        />
        <label for="coverImg">Cover Image URL...</label>
        <input
          type="url"
          name="coverImg"
          placeholder="Cover Image URL..."
          v-model="account.coverImg"
        />
      </div>

      <div class="d-flex flex-column p-4">
        <small>Please enter links to your socials and resume.</small>
        <input
          class="mt-4"
          type="url"
          name="github"
          placeholder="github link..."
          v-model="account.github"
        />
        <input
          class="mt-4"
          type="url"
          name="linkedin"
          placeholder="linkedin url..."
          v-model="account.linkedin"
        />
        <input
          class="mt-4"
          type="url"
          name="resume"
          placeholder="resume URL..."
          v-model="account.resume"
        />
        <input class="mt-4" type="text" name="class" placeholder="class of..." v-model="account.class" />
        <label for="graduated">Are you an alumni of BCW?</label>
        <input type="checkbox" v name="graduated" v-model="account.graduated">
      </div>
      <span class="mt-2">
        <button type="submit" class="btn btn-success selectable">Submit</button>
      </span>
    </div>
  </form>
</template>

<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  name: "Account",
  setup() {
    const editing = ref({});
    return {
      editing,
      account: computed(() => AppState.account),

      async editProfile() {
        try {
          await accountService.editAccount(AppState.account);
          Pop.toast("Profile modified", "success");
        } catch (error) {
          Pop.toast("error", "error");
        }
      },
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.profile-form {
  min-height: 100%;
}
</style>
