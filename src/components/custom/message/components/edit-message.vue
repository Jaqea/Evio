<template>
  <hover-container
    tooltip-content="编辑"
    class="w-9 text-5"
    @click="handleEdit"
  >
    <icon-basil:edit-outline />
  </hover-container>
</template>

<script setup lang="ts">
defineOptions({
  name: "EditMessage",
});

const emit = defineEmits(["handleEdit"]);
const handleEdit = () => {
  emit("handleEdit");
};
</script>
