<template>
  <div class="component">
    <img :src="activeBillboards[0].tall" alt="" class="img-fluid" />
    <img :src="activeBillboards[1].tall" alt="" class="img-fluid" />
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { billboardsService } from "../services/BillboardsService.js";
import { AppState } from "../AppState";
export default {
  // props: {
  //   billboard: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  setup() {
    onMounted(async () => {
      try {
        await billboardsService.getBillboards();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      activeBillboards: computed(() => AppState.activeBillboards),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>