<template>
  <div class="container-fluid bg">
    <div class="row">

      <!--SECTION ACCOUNT DETAILS-->
      <div class="text-body col-md-10">

        <div class="about text-center">
          <img :src="account.coverImg" class="img-fluid p-2 mt-3" alt="" />
          <h1 class="creeper">Welcome {{ account.name }}</h1>
          <img class="rounded-circle" :src="account.picture" alt="" />
          <h3>{{ account.email }}</h3>
          <p>{{ account.bio }}</p>

          <div class="d-flex justify-content-center">
            <div class="d-flex flex-column align-items-start text-body">

              <span> <b>Github</b> {{ account.github }}</span>
              <span> <b>Linkedin:</b> {{ account.linkedin }}</span>
              <span> <b>Resume:</b> {{ account.resume }}</span>
              <span> <b>Class:</b> {{ account.class }}/ <b>Graduate?</b> {{ account.graduated }}</span>
            </div>
          </div>

        </div>
        <!--SECTION ACCOUNT FORM-->
        <form class="input-group p-3 justify-content-center" @submit.prevent="editProfile(formData)">
          <div class="d-flex">
            <div class="d-flex flex-column profile-form">
              <label for="email">Account email</label>
              <input type="text" name="email" placeholder="email..." />
              <label class="mt-2" for="name">Change username</label>
              <input class="mt-2" type="text" name="name" placeholder="new username..." v-model="account.name" />
              <label class="mt-2" for="picture">Enter a URL link to your profile picture
              </label>
              <input class="mt-2" type="url" name="picture" placeholder="https://something.jpg"
                v-model="account.picture" />
              <label for="bio">Bio</label>
              <input type="text" name="bio" placeholder="Bio..." v-model="account.bio" />
              <label for="coverImg">Cover Image URL...</label>
              <input type="url" name="coverImg" placeholder="Cover Image URL..." v-model="account.coverImg" />
            </div>

            <div class="d-flex flex-column p-4 text-body">
              <small>Enter links to your socials and resume</small>
              <input class="mt-4" type="url" name="github" placeholder="github link..." v-model="account.github" />
              <input class="mt-4" type="url" name="linkedin" placeholder="linkedin url..." v-model="account.linkedin" />
              <input class="mt-4" type="url" name="resume" placeholder="resume URL..." v-model="account.resume" />
              <input class="mt-4" type="text" name="class" placeholder="class of..." v-model="account.class" />
              <label for="graduated">Are you an alumni of BCW?</label>
              <input type="checkbox" v name="graduated" v-model="account.graduated">
            </div>
          </div>
          <span class="mt-2">
            <button type="submit" class="btn btn-info selectable">Submit</button>
          </span>
        </form>
      </div>

      <!--SECTION ADS -->
      <div class="col-md-2 ads p-0 align-content-end">
        <Billboard v-for="b in billboards" :key="b.id" :billboards="b" />
      </div>


    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import { onMounted } from "vue";
import { billboardsService } from "../services/BillboardsService";
import { logger } from "../utils/Logger";
export default {
  name: "Account",
  setup() {
    onMounted(async () => {
      try {
        await billboardsService.getBillboards();

      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    const editing = ref({});
    return {
      editing,
      account: computed(() => AppState.account),
      billboards: computed(() => AppState.activeBillboards),

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
  max-width: 50vh;
}

.profile-form {
  min-height: 100%;
  color: #c391ee;
}

.creeper {
  font-family: 'Creepster', cursive;
  color: #c391ee;
}

.text-body {
  color: #c391ee !important;
  text-shadow: 3px 3px black;
}

.link {
  outline: #c391ee;
  color: #c391ee;
}

.ads{
  /* margin: -2em; */
  margin-right: -2em;
  /* padding: 0em; */
}

.bg{
  background: linear-gradient(to right,#000000, #fc65fc);
}
</style>
