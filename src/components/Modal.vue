<template>
  <div class="modal fade" id="post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content text-body">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body-slot"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.text-body {
  color: #c391ee !important;
  text-shadow: 3px 3px black;
  background-color: black;
}
</style>