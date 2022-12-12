<template>
  <div class="row p-2 bg-black mt-2" v-if="activeProfile !== null">
    <img :src="activeProfile.coverImg" alt="" class="img-fluid rounded mt-3">
    <div class="col-md-6">
      <div class="d-flex">

        <img :src="activeProfile.picture" alt="profile pic" class="img-clamp img mt-5">
        <i v-if="activeProfile.graduated" class="mdi mdi-school" style="font-size: 2em"></i>


      </div>
    </div>
    <div class="col-md-6">
      <div class="d-flex">
        <div class="d-flex text-dark">
          <a :href="activeProfile.github" v-if="activeProfile.github ? activeProfile.github : ''">
            <i class="mdi mdi-github icon ms-4 selectable"></i></a>

          <a :href="activeProfile.linkedin" v-if="activeProfile.linkedin ? activeProfile.linkedin : ''">
            <i class="mdi mdi-linkedin icon ms-4 selectable"></i></a>
          <a :href="activeProfile.resume" v-if="activeProfile.resume ? activeProfile.resume : ''">
            <i class="mdi mdi-account icon ms-4 selectable"></i></a>
        </div>
      </div>
    </div>
  </div>
  <div class="row px-2" v-if="activeProfile">
    <!-- body or bio here -->
    <h2 class="creeper pt-2">{{ activeProfile.name }}</h2>
    <p class="class">{{ activeProfile.class }}</p>
    <p class="bio">{{ activeProfile.bio }}</p>
  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      activeProfile: computed(() => AppState.activeProfile)
    };
  },
};
</script>


<style lang="scss" scoped>
.img-clamp {
  border-radius: 50%;
  max-height: 50%;
  transform: translateY(-70px);
}

.creeper {
  font-family: 'Creepster', cursive !important;
  font-size: 1.8em;
  text-shadow: 3px 3px black;
}

.bio {
  text-shadow: 3px 3px black;
}

.img {
  max-height: 100px;
}

.icon {
  font-size: 1.8em;
}

a {
  color: black;
}

.class {
  font-size: .70em;
  text-shadow: 3px 3px black;
}

.bg-black {
  color: black;
}
</style>