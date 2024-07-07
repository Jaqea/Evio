<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in" :appear="true">
      <component v-if="route.name === 'model'" :is="Component" />
      <keep-alive v-else>
        <component
          :is="Component"
          v-if="app.reloadFlag"
          :key="route.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";

defineOptions({
  name: "GlobalContent",
});

const app = useAppStore();
</script>

<style lang="css" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
