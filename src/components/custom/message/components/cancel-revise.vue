<template>
  <hover-container
    tooltip-content="取消"
    class="w-9 text-5"
    @click="handleCancel"
  >
    <icon-icons8:cancel />
  </hover-container>
</template>

<script setup lang="ts">
defineOptions({
  name: "CancelRevise",
});

const emit = defineEmits(["handleCancel"]);
const handleCancel = () => {
  emit("handleCancel");
};
</script>
