<template>
  <hover-container class="w-10 text-5" @click="toggle" tooltip-content="全屏">
    <icon-gridicons-fullscreen-exit v-if="isFullscreen" />
    <icon-gridicons-fullscreen v-else />
  </hover-container>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";

defineOptions({
  name: "FullScreen",
});

const { isFullscreen, toggle } = useFullscreen();
</script>
