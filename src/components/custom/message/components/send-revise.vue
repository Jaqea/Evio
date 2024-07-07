<template>
  <hover-container
    tooltip-content="发送"
    class="w-9 text-5"
    @click="handleSend"
  >
    <icon-cil:send />
  </hover-container>
</template>

<script setup lang="ts">
defineOptions({
  name: "SendRevise",
});

const emit = defineEmits(["handleSend"]);

const handleSend = () => {
  emit("handleSend");
};
</script>
