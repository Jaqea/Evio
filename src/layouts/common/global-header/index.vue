<template>
  <div class="h-full flex flex-justify-between">
    <div class="flex">
      <menu-collapse />
      <new-chat />
    </div>
    <div class="flex">
      <theme-mode />
      <full-screen />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuCollapse, ThemeMode, FullScreen, NewChat } from "./components";
defineOptions({
  name: "GlobalHeader",
});
</script>
